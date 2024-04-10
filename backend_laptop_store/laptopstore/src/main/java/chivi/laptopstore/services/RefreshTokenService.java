package chivi.laptopstore.services;

import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.exception.CustomNotFoundException;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.entities.RefreshTokenEntity;
import chivi.laptopstore.repositories.IRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final IRefreshTokenRepository repository;
    @Value("${app.refresh.token.expired}")
    private long expireDuration;

    public RefreshTokenEntity getByToken(String token) {
        RefreshTokenEntity refreshToken = repository.findById(token).orElseThrow(() -> new CustomNotFoundException("refresh token", token));
        if (refreshToken.getExpiration().compareTo(Instant.now()) < 0) {
            repository.delete(refreshToken);
            throw new BaseException(HttpStatus.FORBIDDEN.value(), "Refresh token was expired");
        }
        return refreshToken;
    }

    public RefreshTokenEntity create(AccountEntity account) {
        Instant expiration = Instant.now().plusMillis(expireDuration);
        RefreshTokenEntity refreshToken = new RefreshTokenEntity(UUID.randomUUID().toString(), account, expiration);
        return repository.save(refreshToken);
    }

    public void destroy(RefreshTokenEntity refreshToken) {
        repository.delete(refreshToken);
    }
}
