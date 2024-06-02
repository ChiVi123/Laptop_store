package chivi.laptopstore;

import chivi.laptopstore.common.EntityStatus;
import chivi.laptopstore.models.CategoryInfo;
import chivi.laptopstore.models.CategoryNode;
import chivi.laptopstore.models.RefreshToken;
import chivi.laptopstore.repositories.ICategoryInfoRepository;
import chivi.laptopstore.repositories.ICategoryNodeRepository;
import chivi.laptopstore.repositories.IRefreshTokenRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Slf4j
@Component
@AllArgsConstructor
public class InitDatabaseLoader implements CommandLineRunner {
    private final ICategoryInfoRepository categoryInfoRepository;
    private final ICategoryNodeRepository categoryNodeRepository;
    //    private final ICartRepository cartRepository;
    private final IRefreshTokenRepository refreshTokenRepository;

    @Override
    public void run(String... args) throws Exception {
        this.initialCategory();
        this.setStateExpired();
        this.handleRefreshTokenExpired();
    }

    private void initialCategory() {
        if (!categoryInfoRepository.findAll().isEmpty()) {
            log.info("Categories have already!!!");
            return;
        }

        CategoryInfo rootCategoryInfo = new CategoryInfo("root", "root", "", false, EntityStatus.ENABLED);
        CategoryInfo defaultCategoryInfo = new CategoryInfo("default", "default", "1", false, EntityStatus.ENABLED);

        CategoryNode defaultCategoryNode = new CategoryNode();
        CategoryNode rootCategoryNode = new CategoryNode();

        defaultCategoryNode.setParent(rootCategoryNode);
        defaultCategoryNode.setInfo(defaultCategoryInfo);

        rootCategoryNode.setInfo(rootCategoryInfo);
        rootCategoryNode.setChildren(List.of(defaultCategoryNode));

        categoryInfoRepository.saveAll(List.of(rootCategoryInfo, defaultCategoryInfo));
        categoryNodeRepository.saveAll(List.of(rootCategoryNode, defaultCategoryNode));

        log.info("Init root and default category!!!");
    }

    private void setStateExpired() {
//        List<Cart> carts = cartRepository.findAllByStatus(EntityStatus.ENABLED);
//        carts.forEach(cart -> {
//            if (cart.getExpiration().compareTo(Instant.now()) < 0) {
//                cart.setStatus(EntityStatus.DISABLED);
//            }
//        });
//        cartRepository.saveAll(carts);
    }

    private void handleRefreshTokenExpired() {
        List<RefreshToken> tokens = refreshTokenRepository.findAll();
        List<RefreshToken> filters = tokens
                .stream()
                .filter(token -> token.getExpiration().compareTo(Instant.now()) < 0)
                .toList();
        refreshTokenRepository.deleteAll(filters);
    }
}
