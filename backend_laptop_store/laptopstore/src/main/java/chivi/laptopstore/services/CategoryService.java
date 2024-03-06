package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.models.requests.CategoryRequest;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import chivi.laptopstore.utils.CustomString;
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
        return categoryRepository.findAllByLevelOrderByPositionAsc(rootLevel);
    }

    public CategoryEntity getById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("category", id));
    }

    public void checkConflictByName(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new ConflictException("Category", name);
        }
    }

    public CategoryEntity createCategoryChild(CategoryEntity parent, CategoryRequest request) {
        String path = this.handlePath(request.getPath(), request.getName());
        int level = parent.getLevel() + 1;
        int position = parent.getChildrenSize() + 1;
        CategoryEntity category = new CategoryEntity(level, position, request.getName(), path, request.getStatus());

        parent.addChild(category);
        return categoryRepository.save(parent);
    }

    public CategoryEntity editCategory(CategoryEntity category, CategoryRequest request) {
        String path = this.handlePath(request.getPath(), request.getName());
        category.setName(request.getName());
        category.setPath(path);
        return categoryRepository.save(category);
    }

    public Map<String, CategoryEntity> moveChildNewPosition(CategoryEntity child, CategoryEntity oldParent, CategoryEntity parent) {
        oldParent.removeChild(child);
        child.setLevel(parent.getLevel() + 1);
        child.setPosition(parent.getChildrenSize() + 1);
        parent.addChild(child);

        CategoryEntity updateOldParent = categoryRepository.save(oldParent);
        CategoryEntity updateParent = categoryRepository.save(parent);
        return Map.of("old", updateOldParent, "new", updateParent);
    }

    public void deleteCategory(CategoryEntity child, CategoryEntity parent) {
        parent.removeChild(child);
        categoryRepository.save(parent);
    }

    private String handlePath(String path, String name) {
        return path == null ? CustomString.toSlug(name) : path;
    }
}
