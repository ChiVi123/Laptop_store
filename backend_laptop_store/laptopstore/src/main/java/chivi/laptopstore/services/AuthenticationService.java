package chivi.laptopstore.services;

import chivi.laptopstore.common.EAccountRole;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.exceptions.BaseException;
import chivi.laptopstore.models.requests.LoginRequest;
import chivi.laptopstore.models.requests.RegisterRequest;
import chivi.laptopstore.models.responses.ResponseModel;
import chivi.laptopstore.repositories.entities.IAccountRepository;
import chivi.laptopstore.security.account.AccountDetails;
import chivi.laptopstore.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final IAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public ResponseModel registerAdmin(RegisterRequest registerRequest) {
        AccountEntity accountEntity = this.handleSetDataAccount(registerRequest);
        accountEntity.setEnumRole(EAccountRole.ADMIN);
        return new ResponseModel(true, "Register success", accountRepository.save(accountEntity));
    }

    public ResponseModel registerCustomer(RegisterRequest registerRequest) {
        AccountEntity accountEntity = this.handleSetDataAccount(registerRequest);
        accountEntity.setEnumRole(EAccountRole.CUSTOMER);
        return new ResponseModel(true, "Register success", accountRepository.save(accountEntity));
    }

    public ResponseModel login(LoginRequest loginRequest) {
        String token;

        try {
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            AccountDetails accountDetails = (AccountDetails) authentication.getPrincipal();

            token = jwtUtils.createTokenFromAccount(accountDetails.getAccount());
        } catch (BadCredentialsException badCredentialsException) {
            throw new BadCredentialsException(badCredentialsException.getMessage());
        }

        return new ResponseModel(true, "Login success", token);
    }

    private AccountEntity handleSetDataAccount(RegisterRequest registerRequest) {
        if (accountRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BaseException(HttpStatus.CONFLICT.value(), "Email exists");
        }

        String encode = passwordEncoder.encode(registerRequest.getPassword());
        AccountEntity account = new AccountEntity();

        account.setFullName(registerRequest.getFullName());
        account.setEmail(registerRequest.getEmail());
        account.setPassword(encode);
        return account;
    }
}
