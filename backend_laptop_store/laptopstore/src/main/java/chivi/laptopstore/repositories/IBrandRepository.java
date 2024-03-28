package chivi.laptopstore.repositories;

import chivi.laptopstore.models.entities.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBrandRepository extends JpaRepository<BrandEntity, Long> {
    boolean existsByName(String name);
}
