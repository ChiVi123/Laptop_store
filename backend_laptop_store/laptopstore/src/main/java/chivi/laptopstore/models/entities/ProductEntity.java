package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
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
@Table(name = EntityNames.TABLE_PRODUCT)
@NoArgsConstructor
@Getter
@Setter
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = EntityNames.COLUMN_PRODUCT_ID)
    private Long id;

    @Column(name = EntityNames.COLUMN_PRODUCT_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = EntityNames.COLUMN_PRODUCT_SLUG, unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal discount;

    @Column(name = EntityNames.COLUMN_DISCOUNT_RATE)
    private float discountRate;

    @Column(columnDefinition = "longtext")
    private String description;

    @Column(name = EntityNames.COLUMN_QUANTITY_STOCK, columnDefinition = "int default 0")
    private int quantityStock;

    @Column(name = EntityNames.COLUMN_QUANTITY_SOLD, columnDefinition = "int default 0")
    private int quantitySold;

    @Column(name = EntityNames.COLUMN_RATING_AVERAGE, columnDefinition = "float default 0")
    private float ratingAverage;

    @Column(name = EntityNames.COLUMN_REVIEW_COUNT, columnDefinition = "int default 0")
    private int reviewCount;

    @ManyToOne
    @JoinColumn(name = EntityNames.COLUMN_CATEGORY_ID)
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name = EntityNames.COLUMN_BRAND_ID)
    private BrandEntity brand;

    @CreatedDate
    @Column(name = EntityNames.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = EntityNames.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    @Builder
    private ProductEntity(String name, String slug, BigDecimal price, String description, CategoryEntity category, BrandEntity brand) {
        this.name = name;
        this.slug = slug;
        this.price = price;
        this.description = description;
        this.category = category;
        this.brand = brand;
    }
}
