package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

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

    @Column(name = EntityNames.COLUMN_CATEGORY_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = EntityNames.COLUMN_CATEGORY_URL, unique = true, nullable = false)
    private String url;

    @CreatedDate
    @Column(name = EntityNames.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = EntityNames.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    public CategoryEntity(String name, String url) {
        this.name = name;
        this.url = url;
    }
}
