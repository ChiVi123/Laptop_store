package chivi.laptopstore;

import chivi.laptopstore.common.EntityStatus;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.repositories.ICategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@AllArgsConstructor
public class InitDatabaseLoader implements CommandLineRunner {
    private final ICategoryRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (!repository.findAll().isEmpty()) {
            log.info("Categories have already");
            return;
        }
        int rootLevel = 0;
        String rootDirector = "";
        int defaultLevel = 1;
        String defaultDirector = "0";

        CategoryEntity rootCategory = new CategoryEntity();
        rootCategory.setName("root");
        rootCategory.setPath("root");
        rootCategory.setLevel(rootLevel);
        rootCategory.setDirector(rootDirector);
        rootCategory.setStatus(EntityStatus.ENABLED);

        CategoryEntity defaultCategory = new CategoryEntity();
        defaultCategory.setName("default category");
        defaultCategory.setPath("default-category");
        defaultCategory.setLevel(defaultLevel);
        defaultCategory.setDirector(defaultDirector);
        defaultCategory.setStatus(EntityStatus.ENABLED);

        rootCategory.addChild(defaultCategory);

        repository.saveAll(List.of(rootCategory, defaultCategory));
        log.info("Category root level");
    }
}
