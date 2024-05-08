package chivi.laptopstore.services;

import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.entities.Account;
import chivi.laptopstore.models.entities.RefreshToken;
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

    public RefreshToken getByToken(String token) {
        RefreshToken refreshToken = repository.findById(token).orElseThrow(() -> new NotFoundDataException("refresh token", token));
        if (refreshToken.getExpiration().compareTo(Instant.now()) < 0) {
            repository.delete(refreshToken);
            throw new BaseException(HttpStatus.FORBIDDEN.value(), "Refresh token was expired");
        }
        return refreshToken;
    }

    public RefreshToken create(Account account) {
        Instant expiration = Instant.now().plusMillis(expireDuration);
        RefreshToken refreshToken = new RefreshToken(UUID.randomUUID().toString(), account, expiration);
        return repository.save(refreshToken);
    }

    public void destroy(RefreshToken refreshToken) {
        repository.delete(refreshToken);
    }
}
