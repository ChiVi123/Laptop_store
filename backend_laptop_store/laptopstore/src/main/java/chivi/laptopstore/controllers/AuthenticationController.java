package chivi.laptopstore.controllers;

import chivi.laptopstore.common.EAccountRole;
import chivi.laptopstore.common.EAccountStatus;
import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.events.OnRegistrationEvent;
import chivi.laptopstore.events.OnResetPasswordEvent;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.entities.VerificationTokenEntity;
import chivi.laptopstore.models.exceptions.BaseException;
import chivi.laptopstore.models.requests.LoginRequest;
import chivi.laptopstore.models.requests.RegisterRequest;
import chivi.laptopstore.models.requests.SendEmailRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.security.jwt.JwtUtils;
import chivi.laptopstore.services.AccountService;
import chivi.laptopstore.services.AuthenticationService;
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
    private final JwtUtils jwtUtils;
    private final ApplicationEventPublisher applicationEventPublisher;

    @GetMapping(RequestMaps.AUTH_PATHNAME + "registration-confirm")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse registrationConfirm(@RequestParam("token") String token) {
        VerificationTokenEntity verificationToken = authenticationService.getVerificationToken(token);
        AccountEntity account = verificationToken.getAccount();

        if (LocalDateTime.now().isAfter(verificationToken.getExpired())) {
            throw new BaseException(HttpStatus.UNAUTHORIZED.value(), "Token's " + account.getEmail() + " is expired");
        }

        if (account.getStatus() != EAccountStatus.NOT_VERIFIED) {
            throw new BaseException(HttpStatus.UNAUTHORIZED.value(), "Email: " + account.getEmail() + " is verified");
        }

        AccountEntity result = authenticationService.activeAccount(account);
        String jwtToken = jwtUtils.createTokenFromAccount(result);
        return new SuccessResponse("Verify successfully", jwtToken);
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "login")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        String token = authenticationService.getJwtToken(email, password);
        return new SuccessResponse("Login success", token);
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "register-admin")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse registerAdmin(@RequestParam("app_url") String appURL, @Valid @RequestBody RegisterRequest request) {
        authenticationService.checkConflictAccountByEmail(request.getEmail());

        AccountEntity account = authenticationService.createAccount(request, EAccountRole.ADMIN);
        OnRegistrationEvent event = new OnRegistrationEvent(account, appURL);

        applicationEventPublisher.publishEvent(event);
        return new SuccessResponse("Register success", account);
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "register-customer")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse registerCustomer(@RequestParam("app_url") String appURL, @Valid @RequestBody RegisterRequest request) {
        authenticationService.checkConflictAccountByEmail(request.getEmail());

        AccountEntity account = authenticationService.createAccount(request, EAccountRole.CUSTOMER);
        OnRegistrationEvent event = new OnRegistrationEvent(account, appURL);

        applicationEventPublisher.publishEvent(event);
        return new SuccessResponse("Register success", account);
    }

    @PutMapping(RequestMaps.AUTH_PATHNAME + "send-verification-token")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse sendVerificationToken(@Valid @RequestBody SendEmailRequest sendEmailRequest) {
        String email = sendEmailRequest.getEmail();
        String appURL = sendEmailRequest.getAppURL();
        AccountEntity account = accountService.getByEmail(email);
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
}
