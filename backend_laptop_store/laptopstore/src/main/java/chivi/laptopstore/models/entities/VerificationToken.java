package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = EntityNames.TABLE_VERIFICATION_TOKEN)
@NoArgsConstructor
@Data
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = EntityNames.COLUMN_ACCOUNT_ID)
    private Account account;

    private String token;

    private LocalDateTime expired;

    public VerificationToken(Account account, String token) {
        this.account = account;
        this.token = token;
        this.expired = LocalDateTime.now().plusMinutes(10);
    }

    public void setNewExpired() {
        this.expired = LocalDateTime.now().plusMinutes(10);
    }
}
