package chivi.laptopstore.repositories;

import chivi.laptopstore.models.ProductInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductInfoRepository extends JpaRepository<ProductInfo, Long> {
    @Query(value = "SELECT * FROM product_info_tb p " +
            "WHERE p.name LIKE CONCAT('%', :query, '%') OR p.description LIKE CONCAT('%', :query, '%')", nativeQuery = true)
    Page<ProductInfo> searchByQuery(@Param("query") String query, Pageable pageable);

    List<ProductInfo> findAllByOrderByCreatedDateDesc();

    @Query(value = "SELECT DISTINCT " +
            "pro_in.id, pro_in.name, pro_in.slug, pro_in.thumbnail_url, pro_in.description, pro_in.price, " +
            "pro_in.discount, pro_in.quantity_stock, pro_in.discount_rate, pro_in.quantity_sold, " +
            "pro_in.rating_average, pro_in.review_count, pro_in.status, pro_in.created_at, pro_in.updated_at " +
            "FROM product_category_tb pro_cate " +
            "JOIN product_detail_tb pro_dt ON pro_cate.product_id=pro_dt.id " +
            "JOIN product_info_tb pro_in ON pro_dt.product_info_id=pro_in.id " +
            "WHERE pro_cate.category_id IN (?1)",
            nativeQuery = true
    )
    Page<ProductInfo> findAllByCategories(List<Long> categoryIds, Pageable pageable);

    boolean existsByName(String name);
}
/*
 * select distinct pro_i.id as product_id, pro_i.name
 * from product_category pro_cate
 * join product_detail pro_d on pro_cate.product_id=pro_d.id
 * join product_info pro_i on pro_d.product_info_id=pro_i.id
 * where pro_cate.category_id in (19, 20, 21, 22, 23, 24, 25, 26, 27);
 * */
