package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import chivi.laptopstore.common.EntityStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = EntityNames.TABLE_BRAND)
@Getter
@Setter
public class BrandEntity extends EntityStandard {
    @Column(name = EntityNames.COLUMN_BRAND_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = EntityNames.COLUMN_BRAND_SLUG, unique = true, nullable = false)
    private String slug;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private ImageEntity logo;

    private EntityStatus status;
}
