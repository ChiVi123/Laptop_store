package chivi.laptopstore.repositories;

import chivi.laptopstore.models.entities.ProductInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductInfoRepository extends JpaRepository<ProductInfo, Long> {
    Page<ProductInfo> findAllByOrderByCreatedDateDesc(Pageable pageable);

    boolean existsByName(String name);

}
