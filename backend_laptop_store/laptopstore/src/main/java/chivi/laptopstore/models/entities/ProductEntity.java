package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import chivi.laptopstore.common.EntityStatus;
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
    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = EntityNames.TABLE_PRODUCT_CATEGORY,
            joinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_PRODUCT_ID),
            inverseJoinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_CATEGORY_ID)
    )
    private List<CategoryEntity> categories = new ArrayList<>();

    @Column(columnDefinition = "longtext")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = EntityNames.COLUMN_QUANTITY_STOCK, columnDefinition = "int default 0")
    private int quantityStock;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = EntityNames.TABLE_PRODUCT_IMAGE,
            joinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_PRODUCT_ID),
            inverseJoinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_IMAGE_ID)
    )
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

    private EntityStatus status;

    public void addAllCategory(List<CategoryEntity> categories) {
        this.categories.addAll(categories);
    }

    public void clearAllCategory() {
        this.categories.clear();
    }

    public void addImage(ImageEntity images) {
        this.images.add(images);
    }

    public void removeImage(ImageEntity image) {
        this.images.remove(image);
    }
}
