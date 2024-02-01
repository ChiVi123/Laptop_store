package chivi.laptopstore.security.account;

import chivi.laptopstore.common.EAccountStatus;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.exceptions.UnauthorizedException;
import chivi.laptopstore.repositories.entities.IAccountRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AccountDetailsService implements UserDetailsService {
    private final IAccountRepository accountRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        List<EAccountStatus> specifiesStatus = List.of(EAccountStatus.ACTIVE, EAccountStatus.NOT_VERIFIED);
        UsernameNotFoundException usernameNotFoundException = new UsernameNotFoundException("Can't found account with email: " + email);
        AccountEntity account = accountRepository.findByEmailAndStatusIn(email, specifiesStatus).orElseThrow(() -> usernameNotFoundException);

        if (account.getStatus() == EAccountStatus.NOT_VERIFIED) {
            throw new UnauthorizedException("Email " + email + " is not verified");
        }
        return new AccountDetails(account);
    }
}
