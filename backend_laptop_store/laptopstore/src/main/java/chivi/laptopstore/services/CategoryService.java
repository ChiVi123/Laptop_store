package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.models.requests.CategoryRequest;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class CategoryService {
    private final ICategoryRepository repository;

    public List<CategoryEntity> getAllRoot() {
        return repository.findAllByParent_Id(null);
    }

    public CategoryEntity getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new CustomNotFoundException("category", id));
    }

    public void checkConflictByName(String name) {
        if (repository.existsByName(name)) {
            throw new ConflictException("Category", name);
        }
    }

    public CategoryEntity createRoot(CategoryRequest request) {
        String rootDirector = "";
        int rootLevel = 0;
        return repository.save(request.getBuilder().level(rootLevel).director(rootDirector).build());
    }

    public CategoryEntity createSub(CategoryEntity parent, CategoryRequest request) {
        String director = parent.getNewDirector();
        int level = parent.getChildLevel();
        parent.addChild(request.getBuilder().level(level).director(director).build());
        return repository.save(parent);
    }

    public CategoryEntity editInfo(CategoryEntity category, CategoryRequest request) {
        category.setName(request.getName());
        category.setPath(request.handlePath());
        return repository.save(category);
    }

    public void move(CategoryEntity fromCategory, CategoryEntity toCategory) {
        CategoryEntity parentFrom = fromCategory.getParent();
        if (parentFrom == null) {
            toCategory.addChild(fromCategory);
            repository.save(toCategory);
        } else {
            parentFrom.removeChild(fromCategory);
            toCategory.addChild(fromCategory);
            repository.saveAll(List.of(parentFrom, toCategory));
        }
    }

    public void delete(CategoryEntity category) {
        CategoryEntity parent = category.getParent();
        if (parent != null) {
            parent.removeChild(category);
            repository.save(parent);
        } else {
            repository.delete(category);
        }
    }
}
