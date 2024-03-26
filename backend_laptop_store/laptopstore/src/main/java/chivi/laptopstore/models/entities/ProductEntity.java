package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EEntityStatus;
import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = EntityNames.TABLE_PRODUCT)
@NoArgsConstructor
@Getter
@Setter
public class ProductEntity extends EntityStandard {
    @Column(name = EntityNames.COLUMN_PRODUCT_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = EntityNames.COLUMN_PRODUCT_SLUG, unique = true, nullable = false)
    private String slug;

    @ManyToOne
    private CategoryEntity category;

    @ManyToOne
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

    public void addImage(ImageEntity images) {
        this.images.add(images);
    }

    public void removeImage(ImageEntity image) {
        this.images.remove(image);
    }
}
