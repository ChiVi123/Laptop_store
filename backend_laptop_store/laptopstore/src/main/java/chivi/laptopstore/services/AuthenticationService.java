package chivi.laptopstore.services;

import chivi.laptopstore.common.AccountRole;
import chivi.laptopstore.common.AccountStatus;
import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.Account;
import chivi.laptopstore.models.VerificationToken;
import chivi.laptopstore.communication.requests.RegisterRequest;
import chivi.laptopstore.repositories.IAccountRepository;
import chivi.laptopstore.repositories.IVerificationTokenRepository;
import chivi.laptopstore.security.account.AccountDetails;
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

    public VerificationToken getVerificationToken(String token) {
        return verificationTokenRepository.findByToken(token).orElseThrow(() -> new NotFoundDataException("token", token));
    }

    public Account getByEmailAndPassword(String email, String password) throws BadCredentialsException {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        AccountDetails accountDetails = (AccountDetails) authentication.getPrincipal();
        return accountDetails.getAccount();
    }

    public void checkConflictAccountByEmail(String email) {
        if (accountRepository.existsByEmail(email)) {
            throw new ConflictException("Email", email);
        }
    }

    public Account createAccount(RegisterRequest request, AccountRole role) {
        String encoded = passwordEncoder.encode(request.getPassword());
        Account account = new Account();
        account.setFullName(request.getFullName());
        account.setEmail(request.getEmail());
        account.setPassword(encoded);
        account.setRole(role);
        account.setStatus(AccountStatus.NOT_VERIFIED);
        return accountRepository.save(account);
    }

    public Account activeAccount(Account account) {
        account.setStatus(AccountStatus.ACTIVE);
        return accountRepository.save(account);
    }

    public void saveVerificationToken(Account account, String token) {
        Optional<VerificationToken> optional = verificationTokenRepository.findByAccountId(account.getId());

        if (optional.isEmpty()) {
            verificationTokenRepository.save(new VerificationToken(account, token));
            return;
        }

        VerificationToken verificationToken = optional.get();
        verificationToken.setToken(token);
        verificationToken.setNewExpired();
        verificationTokenRepository.save(verificationToken);
    }
}
