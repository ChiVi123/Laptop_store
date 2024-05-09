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
@Table(name = EntityNames.TABLE_PRODUCT_DETAIL)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDetail extends EntityStandard {
    @OneToOne
    @JoinColumn(name = EntityNames.JOIN_COLUMN_PRODUCT_INFO_ID)
    private ProductInfo info;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = EntityNames.TABLE_PRODUCT_CATEGORY,
            joinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_PRODUCT_ID),
            inverseJoinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_CATEGORY_ID)
    )
    private Set<CategoryInfo> categories;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = EntityNames.TABLE_PRODUCT_IMAGE,
            joinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_PRODUCT_ID),
            inverseJoinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_IMAGE_ID)
    )
    private List<Image> images = new ArrayList<>();

    public void addAllCategory(Set<CategoryInfo> categories) {
        this.categories.addAll(categories);
    }

    public void clearAllCategory() {
        this.categories.clear();
    }

    public void addImages(List<Image> images) {
        this.images.addAll(images);
    }

    public void removeImage(Image image) {
        this.images.remove(image);
    }
}