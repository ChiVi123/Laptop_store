package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import chivi.laptopstore.common.EntityStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = EntityNames.TABLE_PRODUCT_INFO)
@NoArgsConstructor
@Getter
@Setter
public class ProductInfo extends EntityStandard {
    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(name = EntityNames.COLUMN_THUMBNAIL_URL)
    private String thumbnailUrl;

    @Column(columnDefinition = "longtext")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal discount;

    @Column(name = EntityNames.COLUMN_QUANTITY_STOCK, columnDefinition = "int default 0")
    private int quantityStock;

    @Column(name = EntityNames.COLUMN_DISCOUNT_RATE)
    private float discountRate;

    @Column(name = EntityNames.COLUMN_QUANTITY_SOLD, columnDefinition = "int default 0")
    private int quantitySold;

    @Column(name = EntityNames.COLUMN_RATING_AVERAGE, columnDefinition = "float default 0")
    private float ratingAverage;

    @Column(name = EntityNames.COLUMN_REVIEW_COUNT, columnDefinition = "int default 0")
    private int reviewCount;

    private EntityStatus status;
}
