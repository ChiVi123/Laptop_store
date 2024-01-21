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
@Table(name = "brand")
@NoArgsConstructor
@Data
public class BrandEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private Long id;

    @Column(name = "brand_name", unique = true, nullable = false)
    private String name;

    @Column(name = "brand_slug", unique = true, nullable = false)
    private String slug;

    @CreatedDate
    @Column(name = ColumnName.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = ColumnName.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    public BrandEntity(String name, String slug) {
        this.name = name;
        this.slug = slug;
    }
}
