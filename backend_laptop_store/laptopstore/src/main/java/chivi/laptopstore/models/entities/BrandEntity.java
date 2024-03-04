package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EEntityStatus;
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
@Table(name = EntityNames.TABLE_BRAND)
@NoArgsConstructor
@Data
public class BrandEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = EntityNames.COLUMN_BRAND_ID)
    private Long id;

    @Column(name = EntityNames.COLUMN_BRAND_NAME, unique = true, nullable = false)
    private String name;

    @Column(name = EntityNames.COLUMN_BRAND_SLUG, unique = true, nullable = false)
    private String slug;

    private EEntityStatus status;

    @CreatedDate
    @Column(name = EntityNames.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = EntityNames.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    public BrandEntity(String name, String slug) {
        this.name = name;
        this.slug = slug;
    }
}
