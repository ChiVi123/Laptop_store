package chivi.laptopstore.repositories.entities;

import chivi.laptopstore.models.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICategoryRepository extends JpaRepository<CategoryEntity, Long> {
    List<CategoryEntity> findAllByLevel(int level);

    boolean existsByName(String name);
}
