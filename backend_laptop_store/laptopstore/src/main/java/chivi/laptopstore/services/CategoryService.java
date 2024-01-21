package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.requests.CategoryRequest;
import chivi.laptopstore.models.responses.ResponseModel;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import chivi.laptopstore.utils.CustomString;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final ICategoryRepository categoryRepository;

    public ResponseModel findAllCategory() {
        return new ResponseModel(true, "Success", categoryRepository.findAll());
    }

    public ResponseModel createCategory(CategoryRequest categoryRequest) {
        String url = categoryRequest.getUrl() == null ? CustomString.toSlug(categoryRequest.getName()) : categoryRequest.getUrl();
        CategoryEntity categoryEntity = new CategoryEntity(categoryRequest.getName(), url);
        return new ResponseModel(true, "Create success", categoryRepository.save(categoryEntity));
    }

    public ResponseModel editCategory(Long categoryID, CategoryRequest categoryRequest) {
        Optional<CategoryEntity> optional = categoryRepository.findById(categoryID);

        if (optional.isEmpty()) {
            return new ResponseModel(false, "Can't find category", new CategoryEntity());
        }

        optional.get().setName(categoryRequest.getName());
        optional.get().setUrl(categoryRequest.getUrl());
        return new ResponseModel(true, "Edit success", categoryRepository.save(optional.get()));
    }

    public ResponseModel deleteCategory(Long categoryId) {
        Optional<CategoryEntity> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty()) {
            return new ResponseModel(false, "Can't found category", "");
        }

        categoryRepository.delete(optionalCategory.get());
        return new ResponseModel(true, "Delete success", "");
    }
}
