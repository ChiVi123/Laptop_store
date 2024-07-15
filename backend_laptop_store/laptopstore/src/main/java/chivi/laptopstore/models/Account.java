package chivi.laptopstore.models;

import chivi.laptopstore.common.AccountRole;
import chivi.laptopstore.common.AccountStatus;
import chivi.laptopstore.common.EntityNames;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@Entity
@Table(name = EntityNames.TABLE_ACCOUNT)
public class Account extends EntityStandard {
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

    @OneToMany(mappedBy = "account")
    private List<Address> addresses;

    @Column(name = EntityNames.COLUMN_ACCOUNT_ROLE)
    private AccountRole role;

    private AccountStatus status;
}


