package chivi.laptopstore.models;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = EntityNames.TABLE_ATTRIBUTE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Attribute extends EntityStandard {
    @Column(name = "attribute_key")
    private String key;
    @Column(name = "attribute_value")
    private String value;
}
