package chivi.laptopstore.repositories;

import chivi.laptopstore.models.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICategoryRepository extends JpaRepository<CategoryEntity, Long> {
    List<CategoryEntity> findAllByParent_Id(Long parent_id);

    boolean existsByName(String name);
}
