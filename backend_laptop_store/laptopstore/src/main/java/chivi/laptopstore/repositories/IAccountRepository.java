package chivi.laptopstore.repositories;

import chivi.laptopstore.common.AccountStatus;
import chivi.laptopstore.models.entities.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface IAccountRepository extends JpaRepository<AccountEntity, Long> {
    Optional<AccountEntity> findByEmail(String email);

    Optional<AccountEntity> findByEmailAndStatusIn(String email, Collection<AccountStatus> status);

    Optional<AccountEntity> findByEmailAndStatus(String email, AccountStatus status);

    boolean existsByEmail(String email);
}
