package chivi.laptopstore.helpers;

import chivi.laptopstore.repositories.IRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
@Setter
public class RefreshTokenTimer implements Runnable {
    private final IRefreshTokenRepository repository;
    private String tokenId;

    @Override
    public void run() {
        log.info("Start refresh token time out");
        repository.findById(tokenId).ifPresent(refreshToken -> {
            if (refreshToken.getExpiration().compareTo(Instant.now()) < 0) {
                repository.delete(refreshToken);
            }
        });
        log.info("Stop refresh token time out");
    }
}
