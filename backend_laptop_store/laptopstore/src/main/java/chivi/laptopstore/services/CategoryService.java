package chivi.laptopstore.services;

import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.CustomNotFoundException;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.requests.CategoryRequest;
import chivi.laptopstore.repositories.ICategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class CategoryService {
    private final ICategoryRepository repository;

    public CategoryEntity getRoot() {
        return repository.findByParent_Id(null).orElseThrow(() -> new BaseException(HttpStatus.NOT_FOUND.value(), "root not found"));
    }

    public List<CategoryEntity> getAllByIds(List<Long> ids) {
        return repository.findAllByIdIn(ids);
    }

    public CategoryEntity getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new CustomNotFoundException("category", id));
    }

    public void checkConflictByName(String name) {
        if (repository.existsByName(name)) {
            throw new ConflictException("Category", name);
        }
    }

    public CategoryEntity create(CategoryEntity parent, CategoryRequest request) {
        int level = parent.getChildLevel();
        String path = request.getPath();
        String director = parent.getNewDirector();
        CategoryEntity category = new CategoryEntity();
        category.setName(request.getName());
        category.setPath(path);
        category.setLevel(level);
        category.setDirector(director);
        category.setStatus(request.getStatus());
        parent.addChild(category);
        CategoryEntity result = repository.save(parent);
        int lastIndex = result.getChildren().size() - 1;
        return result.getChildren().get(lastIndex);
    }

    public CategoryEntity editInfo(CategoryEntity category, CategoryRequest request) {
        String path = request.getPath();

        category.setPath(path);
        category.setName(request.getName());
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
            String path = fromCategory.getPath();

            fromCategory.setPath(path);
            fromCategory.setLevel(toCategory.getChildLevel());
            fromCategory.setDirector(toCategory.getNewDirector());
            toCategory.addChild(fromCategory);

            repository.saveAll(List.of(parentFrom, toCategory));
        }
    }

    public CategoryEntity deleteChild(CategoryEntity category) {
        CategoryEntity parent = category.getParent();
        if (parent == null) {
            throw new BaseException(HttpStatus.BAD_REQUEST.value(), "Cannot delete root");
        }
        parent.removeChild(category);
        return repository.save(parent);
    }
}
