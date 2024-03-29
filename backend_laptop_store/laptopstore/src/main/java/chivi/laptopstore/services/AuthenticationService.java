package chivi.laptopstore.services;

import chivi.laptopstore.common.AccountRole;
import chivi.laptopstore.common.AccountStatus;
import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.CustomNotFoundException;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.entities.VerificationTokenEntity;
import chivi.laptopstore.models.requests.RegisterRequest;
import chivi.laptopstore.repositories.IAccountRepository;
import chivi.laptopstore.repositories.IVerificationTokenRepository;
import chivi.laptopstore.security.account.AccountDetails;
import chivi.laptopstore.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final IAccountRepository accountRepository;
    private final IVerificationTokenRepository verificationTokenRepository;
    private final JwtUtils jwtUtils;

    public VerificationTokenEntity getVerificationToken(String token) {
        return verificationTokenRepository.findByToken(token).orElseThrow(() -> new CustomNotFoundException("token", token));
    }

    public AccountEntity getByEmailAndPassword(String email, String password) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            AccountDetails accountDetails = (AccountDetails) authentication.getPrincipal();
            return accountDetails.getAccount();
        } catch (BadCredentialsException exception) {
            throw new BadCredentialsException(exception.getMessage());
        }
    }

    public void checkConflictAccountByEmail(String email) {
        if (accountRepository.existsByEmail(email)) {
            throw new ConflictException("Email", email);
        }
    }

    public AccountEntity createAccount(RegisterRequest request, AccountRole role) {
        String encoded = passwordEncoder.encode(request.getPassword());
        AccountEntity account = new AccountEntity();
        account.setFullName(request.getFullName());
        account.setEmail(request.getEmail());
        account.setPassword(encoded);
        account.setRole(role);
        account.setStatus(AccountStatus.NOT_VERIFIED);
        return accountRepository.save(account);
    }

    public AccountEntity activeAccount(AccountEntity account) {
        account.setStatus(AccountStatus.ACTIVE);
        return accountRepository.save(account);
    }

    public void saveVerificationToken(AccountEntity account, String token) {
        Optional<VerificationTokenEntity> optional = verificationTokenRepository.findByAccountId(account.getId());

        if (optional.isEmpty()) {
            verificationTokenRepository.save(new VerificationTokenEntity(account, token));
            return;
        }

        VerificationTokenEntity verificationToken = optional.get();
        verificationToken.setToken(token);
        verificationToken.setNewExpired();
        verificationTokenRepository.save(verificationToken);
    }

}
