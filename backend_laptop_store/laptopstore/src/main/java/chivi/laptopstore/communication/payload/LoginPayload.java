package chivi.laptopstore.communication.payload;

import chivi.laptopstore.models.entities.RefreshTokenEntity;
import lombok.Data;

@Data
public class LoginPayload {
    private String accessToken;
    private String refreshToken;
    private long expiration;

    public LoginPayload(String accessToken, RefreshTokenEntity refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken.getId();
        this.expiration = refreshToken.getExpiration().toEpochMilli();
    }
}
