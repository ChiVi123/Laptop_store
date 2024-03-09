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
import java.util.Map;

@Slf4j
@Service
@AllArgsConstructor
public class CategoryService {
    private final ICategoryRepository categoryRepository;

    public List<CategoryEntity> getTreeView() {
        int rootLevel = 0;
        return categoryRepository.findAllByLevel(rootLevel);
    }

    public CategoryEntity getById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("category", id));
    }

    public void checkConflictByName(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new ConflictException("Category", name);
        }
    }

    public CategoryEntity createRoot(CategoryRequest request) {
        String director = "";
        int level = 0;
        return categoryRepository.save(request.getBuilder().level(level).director(director).build());
    }

    public CategoryEntity saveChild(CategoryEntity parent, CategoryRequest request) {
        String director = parent.getNewDirector();
        int level = parent.getChildLevel();
        parent.addChild(request.getBuilder().level(level).director(director).build());
        return categoryRepository.save(parent);
    }

    public CategoryEntity editInfo(CategoryEntity category, CategoryRequest request) {
        category.setName(request.getName());
        category.setPath(request.handlePath());
        return categoryRepository.save(category);
    }

    public Map<String, CategoryEntity> moveChildNewPosition(CategoryEntity child, CategoryEntity oldParent, CategoryEntity parent) {
        oldParent.removeChild(child);
        child.setLevel(parent.getChildLevel());
        child.setDirector(parent.getNewDirector());
        parent.addChild(child);

        CategoryEntity updateOldParent = categoryRepository.save(oldParent);
        CategoryEntity updateParent = categoryRepository.save(parent);
        return Map.of("old", updateOldParent, "new", updateParent);
    }

    public void deleteChild(CategoryEntity child, CategoryEntity parent) {
        parent.removeChild(child);
        categoryRepository.save(parent);
    }

    public void deleteEntity(CategoryEntity category) {
        categoryRepository.delete(category);
    }
}
