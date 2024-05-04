package chivi.laptopstore.repositories;

import chivi.laptopstore.models.entities.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    Optional<ProductDetail> findByInfo_Slug(String slug);
}
