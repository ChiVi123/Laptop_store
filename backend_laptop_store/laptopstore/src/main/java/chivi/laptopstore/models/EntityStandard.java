package chivi.laptopstore.models;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class EntityStandard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @CreatedDate
    @Column(name = EntityNames.COLUMN_CREATED_AT)
    protected LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = EntityNames.COLUMN_UPDATED_AT)
    protected LocalDateTime lastModifiedDate;
}
