package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = EntityNames.TABLE_REFRESH_TOKEN)
@NoArgsConstructor
@Getter
public class RefreshTokenEntity {
    @Id
    @Column(columnDefinition = "varchar(36)")
    private String id;

    @ManyToOne
    private AccountEntity account;

    private Instant expiration;

    public RefreshTokenEntity(String id, AccountEntity account, Instant expiration) {
        this.id = id;
        this.account = account;
        this.expiration = expiration;
    }
}
