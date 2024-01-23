package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.ColumnName;
import chivi.laptopstore.common.EAccountRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "account")
@NoArgsConstructor
@Data
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(name = "full_name", unique = true, nullable = false)
    private String fullName;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(columnDefinition = "varchar(14)")
    private String phone;

    @Column(name = "review_count", columnDefinition = "int default 0")
    private int reviewCount;

    @Column(name = "like_count", columnDefinition = "int default 0")
    private int likeCount;

    @Column(name = "enum_role")
    private EAccountRole enumRole;

    @CreatedDate
    @Column(name = ColumnName.CREATED_AT)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = ColumnName.UPDATED_AT)
    private LocalDateTime lastModifiedDate;

    public AccountEntity(String email) {
        this.email = email;
    }
}
