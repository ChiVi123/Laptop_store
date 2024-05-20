package chivi.laptopstore.repositories;

import chivi.laptopstore.models.CategoryNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICategoryNodeRepository extends JpaRepository<CategoryNode, Long> {
    Optional<CategoryNode> findByParent_Id(Long parent_id);

    Optional<CategoryNode> findByInfo_Id(Long info_id);
}
