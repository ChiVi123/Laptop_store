package chivi.laptopstore.services;

import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.helpers.RefreshTokenTimer;
import chivi.laptopstore.models.Account;
import chivi.laptopstore.models.RefreshToken;
import chivi.laptopstore.repositories.IRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final IRefreshTokenRepository repository;
    private final RefreshTokenTimer refreshTokenTimer;
    private final TaskScheduler taskScheduler;
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
        refreshTokenTimer.setTokenId(refreshToken.getId());
        taskScheduler.schedule(refreshTokenTimer, expiration);
        return repository.save(refreshToken);
    }

    public void destroy(RefreshToken refreshToken) {
        repository.delete(refreshToken);
    }
}
