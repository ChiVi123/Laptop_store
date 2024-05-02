package chivi.laptopstore.repositories;

import chivi.laptopstore.models.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAllByOrderByCreatedDateDesc(Pageable pageable);

    Page<ProductEntity> findAllByCategories_Id(long id, Pageable pageable);

    Optional<ProductEntity> findBySlug(String slug);

    boolean existsByName(String name);
}
