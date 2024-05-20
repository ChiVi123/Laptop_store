package chivi.laptopstore.models;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = EntityNames.TABLE_REFRESH_TOKEN)
@NoArgsConstructor
@Getter
public class RefreshToken {
    @Id
    @Column(columnDefinition = "varchar(36)")
    private String id;

    @ManyToOne
    private Account account;

    private Instant expiration;

    public RefreshToken(String id, Account account, Instant expiration) {
        this.id = id;
        this.account = account;
        this.expiration = expiration;
    }
}
