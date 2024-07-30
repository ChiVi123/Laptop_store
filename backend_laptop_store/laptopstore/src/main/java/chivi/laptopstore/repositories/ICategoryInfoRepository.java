package chivi.laptopstore.repositories;

import chivi.laptopstore.models.CategoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Repository
public interface ICategoryInfoRepository extends JpaRepository<CategoryInfo, Long> {
//    id, name, path, code, is_leaf, status, created_at, updated_at

    Set<CategoryInfo> findAllByIdIn(Collection<Long> id);

    @Query(value = "SELECT id FROM category_info_tb WHERE code LIKE CONCAT('%', ?1, '%') AND is_leaf=?2", nativeQuery = true)
    List<Long> findAllIdByCodeLikeAndLeaf(String code, boolean leaf);

    boolean existsByName(String name);
}
