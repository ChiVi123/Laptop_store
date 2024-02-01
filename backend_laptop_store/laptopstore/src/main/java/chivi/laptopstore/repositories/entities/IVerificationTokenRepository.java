package chivi.laptopstore.repositories.entities;

import chivi.laptopstore.models.entities.VerificationTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IVerificationTokenRepository extends JpaRepository<VerificationTokenEntity, Long> {
    Optional<VerificationTokenEntity> findByToken(String token);

    Optional<VerificationTokenEntity> findByAccountId(Long account_id);
}
