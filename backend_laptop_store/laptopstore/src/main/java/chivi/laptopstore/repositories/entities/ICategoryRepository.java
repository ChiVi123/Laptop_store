package chivi.laptopstore.repositories.entities;

import chivi.laptopstore.models.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends JpaRepository<CategoryEntity, Long> {
    boolean existsByName(String name);
}
