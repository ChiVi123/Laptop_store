package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.ColumnName;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "product")
@NoArgsConstructor
@Getter
@Setter
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(name = "product_name", unique = true, nullable = false)
    private String name;

    @Column(name = "product_slug", unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal discount;

    @Column(name = "discount_rate")
    private float discountRate;

    @Column(columnDefinition = "longtext")
    private String description;

    @Column(name = "quantity_stock", columnDefinition = "int default 0")
    private int quantityStock;

    @Column(name = "quantity_sold", columnDefinition = "int default 0")
    private int quantitySold;

    @Column(name = "rating_average", columnDefinition = "float default 0")
    private float ratingAverage;

    @Column(name = "review_count", columnDefinition = "int default 0")
    private int reviewCount;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private BrandEntity brand;

    @CreatedDate
    @Column(name = ColumnName.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = ColumnName.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    @Builder
    public ProductEntity(String name, String slug, BigDecimal price, String description, CategoryEntity category, BrandEntity brand) {
        this.name = name;
        this.slug = slug;
        this.price = price;
        this.description = description;
        this.category = category;
        this.brand = brand;
    }
}
