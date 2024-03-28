package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import chivi.laptopstore.common.EntityStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = EntityNames.TABLE_CATEGORY)
@NoArgsConstructor
@Getter
@Setter
public class CategoryEntity extends EntityStandard {
    private int level;

    @Column(name = EntityNames.COLUMN_CATEGORY_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = EntityNames.COLUMN_CATEGORY_PATH, unique = true, nullable = false)
    private String path;

    private String director;

    @ManyToOne
    @JoinColumn(name = EntityNames.JOIN_COLUMN_PARENT_ID, referencedColumnName = "id")
    @JsonBackReference
    private CategoryEntity parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CategoryEntity> children = new ArrayList<>();

    private EntityStatus status;

    public void addChild(CategoryEntity child) {
        this.children.add(child);
        child.parent = this;
    }

    public void removeChild(CategoryEntity child) {
        this.children.remove(child);
        child.parent = null;
    }

    @JsonIgnore
    public String getNewDirector() {
        return this.director.equals("") ? this.id.toString() : this.director + "," + this.id;
    }

    @JsonIgnore
    public int getChildLevel() {
        return this.level + 1;
    }
}
