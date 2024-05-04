package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "category_info")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryInfo extends EntityStandard {
    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String path;

    private String code;

    private EntityStatus status;
}
