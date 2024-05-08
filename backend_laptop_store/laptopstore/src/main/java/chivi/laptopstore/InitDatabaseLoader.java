package chivi.laptopstore;

import chivi.laptopstore.common.EntityStatus;
import chivi.laptopstore.models.entities.CategoryInfo;
import chivi.laptopstore.models.entities.CategoryNode;
import chivi.laptopstore.repositories.ICategoryInfoRepository;
import chivi.laptopstore.repositories.ICategoryNodeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@AllArgsConstructor
public class InitDatabaseLoader implements CommandLineRunner {
    private final ICategoryInfoRepository categoryInfoRepository;
    private final ICategoryNodeRepository categoryNodeRepository;

    @Override
    public void run(String... args) throws Exception {
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
}
