package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "product_detail")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDetail extends EntityStandard {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_info_id")
    private ProductInfo info;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_PRODUCT_ID),
            inverseJoinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_CATEGORY_ID)
    )
    private Set<CategoryInfo> categories;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "product_image",
            joinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_PRODUCT_ID),
            inverseJoinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_IMAGE_ID)
    )
    private List<ImageEntity> images = new ArrayList<>();

    public void addAllCategory(Set<CategoryInfo> categories) {
        this.categories.addAll(categories);
    }

    public void clearAllCategory() {
        this.categories.clear();
    }

    public void addImages(List<ImageEntity> images) {
        this.images.addAll(images);
    }

    public void removeImage(ImageEntity image) {
        this.images.remove(image);
    }
}
