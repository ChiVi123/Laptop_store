package chivi.laptopstore;

import chivi.laptopstore.common.EEntityStatus;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class InitDatabaseLoader implements CommandLineRunner {
    private final ICategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (!categoryRepository.findAll().isEmpty()) {
            log.info("Categories have already");
            return;
        }
        categoryRepository.save(new CategoryEntity(0, "root", "/", "", EEntityStatus.ENABLED));
        log.info("Category root level");
    }
}
