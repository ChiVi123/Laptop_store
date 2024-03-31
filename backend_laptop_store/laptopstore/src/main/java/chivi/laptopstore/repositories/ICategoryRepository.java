package chivi.laptopstore.repositories;

import chivi.laptopstore.models.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ICategoryRepository extends JpaRepository<CategoryEntity, Long> {
    Optional<CategoryEntity> findByParent_Id(Long parent_id);

    List<CategoryEntity> findAllByIdIn(Collection<Long> id);

    boolean existsByName(String name);
}
