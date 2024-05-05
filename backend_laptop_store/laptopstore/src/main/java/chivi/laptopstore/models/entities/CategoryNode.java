package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category_node")
@NoArgsConstructor
@Getter
@Setter
public class CategoryNode extends EntityStandard {
    @ManyToOne
    @JoinColumn(name = EntityNames.JOIN_COLUMN_PARENT_ID, referencedColumnName = "id")
    @JsonBackReference
    private CategoryNode parent;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "category_info_id")
    private CategoryInfo info;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CategoryNode> children = new ArrayList<>();

    public void addChild(CategoryNode child) {
        this.children.add(child);
        child.parent = this;
    }

    public void removeChild(CategoryNode child) {
        this.children.remove(child);
        child.parent = null;
    }
}
