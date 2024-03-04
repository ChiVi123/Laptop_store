package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EEntityStatus;
import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = EntityNames.TABLE_PRODUCT)
@NoArgsConstructor
@Data
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = EntityNames.COLUMN_PRODUCT_ID)
    private Long id;

    @Column(name = EntityNames.COLUMN_PRODUCT_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = EntityNames.COLUMN_PRODUCT_SLUG, unique = true, nullable = false)
    private String slug;

    @ManyToOne
    @JoinColumn(name = EntityNames.COLUMN_CATEGORY_ID)
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name = EntityNames.COLUMN_BRAND_ID)
    private BrandEntity brand;

    @Column(columnDefinition = "longtext")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = EntityNames.COLUMN_QUANTITY_STOCK, columnDefinition = "int default 0")
    private int quantityStock;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImageEntity> images = new ArrayList<>();

    private BigDecimal discount;

    @Column(name = EntityNames.COLUMN_DISCOUNT_RATE)
    private float discountRate;

    @Column(name = EntityNames.COLUMN_QUANTITY_SOLD, columnDefinition = "int default 0")
    private int quantitySold;

    @Column(name = EntityNames.COLUMN_RATING_AVERAGE, columnDefinition = "float default 0")
    private float ratingAverage;

    @Column(name = EntityNames.COLUMN_REVIEW_COUNT, columnDefinition = "int default 0")
    private int reviewCount;

    private EEntityStatus status;

    @CreatedDate
    @Column(name = EntityNames.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = EntityNames.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    public void addAllImage(List<ImageEntity> images) {
        this.images.addAll(images);
    }

    public void removeImage(ImageEntity image) {
        this.images.remove(image);
    }
}
