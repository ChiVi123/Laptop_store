package chivi.laptopstore.repositories;

import chivi.laptopstore.common.AccountStatus;
import chivi.laptopstore.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface IAccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email);

    Optional<Account> findByEmailAndStatusIn(String email, Collection<AccountStatus> status);

    Optional<Account> findByEmailAndStatus(String email, AccountStatus status);

    boolean existsByEmail(String email);
}
