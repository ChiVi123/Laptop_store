package chivi.laptopstore.services;

import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.CustomNotFoundException;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.requests.CategoryRequest;
import chivi.laptopstore.repositories.ICategoryRepository;
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
        int rootLevel = 0;
        String rootDirector = "";
        CategoryEntity category = new CategoryEntity();
        category.setName(request.getName());
        category.setPath(request.getPath());
        category.setLevel(rootLevel);
        category.setDirector(rootDirector);
        category.setStatus(request.getStatus());
        return repository.save(category);
    }

    public CategoryEntity createSub(CategoryEntity parent, CategoryRequest request) {
        int level = parent.getChildLevel();
        String director = parent.getNewDirector();
        CategoryEntity category = new CategoryEntity();
        category.setName(request.getName());
        category.setPath(request.getPath());
        category.setLevel(level);
        category.setDirector(director);
        category.setStatus(request.getStatus());

        parent.addChild(category);
        return repository.save(parent);
    }

    public CategoryEntity editInfo(CategoryEntity category, CategoryRequest request) {
        category.setName(request.getName());
        category.setPath(request.getPath());
        category.setStatus(request.getStatus());
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
