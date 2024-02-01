package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EAccountRole;
import chivi.laptopstore.common.EAccountStatus;
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

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = EntityNames.TABLE_ACCOUNT)
@NoArgsConstructor
@Data
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = EntityNames.COLUMN_ACCOUNT_ID)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(name = EntityNames.COLUMN_ACCOUNT_FULL_NAME, nullable = false)
    private String fullName;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(columnDefinition = "varchar(14)")
    private String phone;

    @Column(name = EntityNames.COLUMN_REVIEW_COUNT, columnDefinition = "int default 0")
    private int reviewCount;

    @Column(name = EntityNames.COLUMN_LIKE_COUNT, columnDefinition = "int default 0")
    private int likeCount;

    @Column(name = EntityNames.COLUMN_ACCOUNT_ROLE)
    private EAccountRole role;

    private EAccountStatus status;

    @CreatedDate
    @Column(name = EntityNames.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = EntityNames.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    @Builder
    public AccountEntity(String fullName, String email, String password, EAccountRole role, EAccountStatus status) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
    }
}
