package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.ColumnName;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "category")
@NoArgsConstructor
@Data
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Column(name = "category_name", unique = true, nullable = false)
    private String name;

    @Column(name = "category_url", unique = true, nullable = false)
    private String url;

    @CreatedDate
    @Column(name = ColumnName.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = ColumnName.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    public CategoryEntity(String name, String url) {
        this.name = name;
        this.url = url;
    }
}
