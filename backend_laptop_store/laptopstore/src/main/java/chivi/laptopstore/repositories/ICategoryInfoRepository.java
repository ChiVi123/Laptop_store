package chivi.laptopstore.repositories;

import chivi.laptopstore.models.entities.CategoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;

@Repository
public interface ICategoryInfoRepository extends JpaRepository<CategoryInfo, Long> {
    Set<CategoryInfo> findAllByIdIn(Collection<Long> id);

    boolean existsByName(String name);
}
