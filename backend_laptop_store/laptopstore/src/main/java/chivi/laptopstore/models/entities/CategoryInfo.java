package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @Column(name = "is_leaf", nullable = false)
    @JsonProperty(value = "isLeaf")
    private boolean leaf;

    private EntityStatus status;
}
