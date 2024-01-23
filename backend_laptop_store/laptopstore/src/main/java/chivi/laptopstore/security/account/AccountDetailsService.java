package chivi.laptopstore.security.account;

import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.repositories.entities.IAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountDetailsService implements UserDetailsService {
    private final IAccountRepository accountRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<AccountEntity> account = accountRepository.findByEmail(email);
        if (account.isEmpty()) {
            throw new UsernameNotFoundException("Can't found account with email: " + email);
        }
        return new AccountDetails(account.get());
    }
}
