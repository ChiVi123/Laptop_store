package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EEntityStatus;
import chivi.laptopstore.common.EntityNames;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = EntityNames.TABLE_CATEGORY)
@NoArgsConstructor
@Data
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = EntityNames.COLUMN_CATEGORY_ID)
    private Long id;

    private int level;

    @Column(name = EntityNames.COLUMN_CATEGORY_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = EntityNames.COLUMN_CATEGORY_URL, unique = true, nullable = false)
    private String path;

    private String director;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryEntity> children = new ArrayList<>();

    private EEntityStatus status;

    @CreatedDate
    @Column(name = EntityNames.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = EntityNames.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    @Builder
    public CategoryEntity(int level, String name, String path, String director, EEntityStatus status) {
        this.level = level;
        this.name = name;
        this.path = path;
        this.director = director;
        this.status = status;
    }

    public void addChild(CategoryEntity child) {
        this.children.add(child);
    }

    public void removeChild(CategoryEntity child) {
        this.children.remove(child);
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
