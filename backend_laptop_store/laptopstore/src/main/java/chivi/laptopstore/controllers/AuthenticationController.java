package chivi.laptopstore.controllers;

import chivi.laptopstore.common.AccountRole;
import chivi.laptopstore.common.AccountStatus;
import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.communication.payload.LoginPayload;
import chivi.laptopstore.events.OnRegistrationEvent;
import chivi.laptopstore.events.OnResetPasswordEvent;
import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.entities.RefreshTokenEntity;
import chivi.laptopstore.models.entities.VerificationTokenEntity;
import chivi.laptopstore.models.requests.LoginRequest;
import chivi.laptopstore.models.requests.RefreshTokenRequest;
import chivi.laptopstore.models.requests.RegisterRequest;
import chivi.laptopstore.models.requests.SendEmailRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.security.jwt.JwtUtils;
import chivi.laptopstore.services.AccountService;
import chivi.laptopstore.services.AuthenticationService;
import chivi.laptopstore.services.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final AccountService accountService;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtils jwtUtils;
    private final ApplicationEventPublisher applicationEventPublisher;

    @GetMapping(RequestMaps.AUTH_PATHNAME + "registration-confirm")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse registrationConfirm(@RequestParam("token") String token) {
        VerificationTokenEntity verificationToken = authenticationService.getVerificationToken(token);
        AccountEntity account = verificationToken.getAccount();

        if (LocalDateTime.now().isAfter(verificationToken.getExpired())) {
            throw new BaseException(HttpStatus.UNAUTHORIZED.value(), "Token's " + account.getEmail() + " expired");
        }

        if (account.getStatus() != AccountStatus.NOT_VERIFIED) {
            throw new BaseException(HttpStatus.UNAUTHORIZED.value(), "Email: " + account.getEmail() + " verified");
        }

        AccountEntity result = authenticationService.activeAccount(account);
        String accessToken = jwtUtils.createTokenFromAccount(result);
        RefreshTokenEntity refreshToken = refreshTokenService.create(account);
        return new SuccessResponse("Verify successfully", new LoginPayload(accessToken, refreshToken));
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "login")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        AccountEntity account = authenticationService.getByEmailAndPassword(email, password);
        String accessToken = jwtUtils.createTokenFromAccount(account);
        RefreshTokenEntity refreshToken = refreshTokenService.create(account);
        return new SuccessResponse("Login success", new LoginPayload(accessToken, refreshToken));
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "refresh-token")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse renewToken(@Valid @RequestBody RefreshTokenRequest request) {
        RefreshTokenEntity refreshToken = refreshTokenService.getByToken(request.getToken());
        AccountEntity account = refreshToken.getAccount();
        String accessToken = jwtUtils.createTokenFromAccount(account);
        return new SuccessResponse("Renew access token", accessToken);
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "register-admin")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse registerAdmin(@RequestParam("app_url") String appURL, @Valid @RequestBody RegisterRequest request) {
        authenticationService.checkConflictAccountByEmail(request.getEmail());
        AccountEntity account = authenticationService.createAccount(request, AccountRole.ADMIN);
        OnRegistrationEvent event = new OnRegistrationEvent(account, appURL);
        applicationEventPublisher.publishEvent(event);
        return new SuccessResponse("Register success", account);
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "register-customer")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse registerCustomer(@RequestParam("app_url") String appURL, @Valid @RequestBody RegisterRequest request) {
        authenticationService.checkConflictAccountByEmail(request.getEmail());
        AccountEntity account = authenticationService.createAccount(request, AccountRole.CUSTOMER);
        OnRegistrationEvent event = new OnRegistrationEvent(account, appURL);
        applicationEventPublisher.publishEvent(event);
        return new SuccessResponse("Register success", account);
    }

    @PutMapping(RequestMaps.AUTH_PATHNAME + "send-verification-token")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse sendVerificationToken(@Valid @RequestBody SendEmailRequest sendEmailRequest) {
        String email = sendEmailRequest.getEmail();
        String appURL = sendEmailRequest.getAppURL();
        AccountEntity account = accountService.getByEmailAndStatus(email, AccountStatus.NOT_VERIFIED);
        OnRegistrationEvent event = new OnRegistrationEvent(account, appURL);
        applicationEventPublisher.publishEvent(event);
        return new SuccessResponse("Resend verification token successfully");
    }

    @PutMapping(RequestMaps.AUTH_PATHNAME + "reset-password")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse resetPassword(@Valid @RequestBody SendEmailRequest sendEmailRequest) {
        String email = sendEmailRequest.getEmail();
        OnResetPasswordEvent event = new OnResetPasswordEvent(email);
        applicationEventPublisher.publishEvent(event);
        return new SuccessResponse("Reset password successfully");
    }

    @DeleteMapping(RequestMaps.AUTH_PATHNAME + "logout")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse logout(@RequestParam(name = "token") String token) {
        RefreshTokenEntity refreshToken = refreshTokenService.getByToken(token);
        refreshTokenService.destroy(refreshToken);
        return new SuccessResponse("Logout successfully");
    }
}
