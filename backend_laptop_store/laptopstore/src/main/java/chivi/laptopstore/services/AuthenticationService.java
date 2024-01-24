package chivi.laptopstore.services;

import chivi.laptopstore.common.EAccountRole;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.requests.LoginRequest;
import chivi.laptopstore.models.requests.RegisterRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.repositories.entities.IAccountRepository;
import chivi.laptopstore.security.account.AccountDetails;
import chivi.laptopstore.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
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

    public SuccessResponse registerAdmin(RegisterRequest registerRequest) {
        AccountEntity account = this.handleSetDataAccount(registerRequest);
        account.setEnumRole(EAccountRole.ADMIN);
        return new SuccessResponse("Register success", accountRepository.save(account));
    }

    public SuccessResponse registerCustomer(RegisterRequest registerRequest) {
        AccountEntity account = this.handleSetDataAccount(registerRequest);
        account.setEnumRole(EAccountRole.CUSTOMER);
        return new SuccessResponse("Register success", accountRepository.save(account));
    }

    public SuccessResponse login(LoginRequest loginRequest) {
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

        return new SuccessResponse("Login success", token);
    }

    private AccountEntity handleSetDataAccount(RegisterRequest registerRequest) {
        this.handleConflictAccountByEmail(registerRequest.getEmail());

        String encode = passwordEncoder.encode(registerRequest.getPassword());
        AccountEntity account = new AccountEntity();

        account.setFullName(registerRequest.getFullName());
        account.setEmail(registerRequest.getEmail());
        account.setPassword(encode);
        return account;
    }

    private void handleConflictAccountByEmail(String email) {
        if (accountRepository.existsByEmail(email)) {
            throw new ConflictException("Email", email);
        }
    }
}
