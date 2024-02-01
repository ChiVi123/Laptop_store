package chivi.laptopstore.repositories.entities;

import chivi.laptopstore.common.EAccountStatus;
import chivi.laptopstore.models.entities.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface IAccountRepository extends JpaRepository<AccountEntity, Long> {
    Optional<AccountEntity> findByEmail(String email);

    Optional<AccountEntity> findByEmailAndStatusIn(String email, Collection<EAccountStatus> status);

    boolean existsByEmail(String email);
}
