package chivi.laptopstore.helpers;

import chivi.laptopstore.common.EntityStatus;
import chivi.laptopstore.repositories.ICartRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
@Setter
public class CartTimer implements Runnable {
    private final ICartRepository repository;
    private long cartId;

    @Override
    public void run() {
        log.info("Start checking cart time out");
        repository.findById(cartId).ifPresent(cart -> {
            if (cart.getExpiration().compareTo(Instant.now()) < 0) {
                cart.setStatus(EntityStatus.DISABLED);
                repository.save(cart);
            }
        });
        log.info("Stop checking cart time out");
    }
}
