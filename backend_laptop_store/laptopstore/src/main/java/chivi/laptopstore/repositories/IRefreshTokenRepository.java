package chivi.laptopstore.repositories;

import chivi.laptopstore.models.entities.RefreshTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRefreshTokenRepository extends JpaRepository<RefreshTokenEntity, String> {
}
