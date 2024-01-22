package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.requests.BaseInfoRequest;
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

    public ResponseModel createCategory(BaseInfoRequest baseInfoRequest) {
        String url = handleCategoryUrl(baseInfoRequest);
        CategoryEntity categoryEntity = new CategoryEntity(baseInfoRequest.getName(), url);
        return new ResponseModel(true, "Create success", categoryRepository.save(categoryEntity));
    }

    public ResponseModel editCategory(Long categoryID, BaseInfoRequest baseInfoRequest) {
        Optional<CategoryEntity> optional = categoryRepository.findById(categoryID);

        if (optional.isEmpty()) {
            return new ResponseModel(false, "Can't find category", new CategoryEntity());
        }

        String url = handleCategoryUrl(baseInfoRequest);
        optional.get().setName(baseInfoRequest.getName());
        optional.get().setUrl(url);
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

    public ResponseModel deleteAllCategory() {
        categoryRepository.deleteAll();
        return new ResponseModel(true, "Delete all category success", "");
    }

    private String handleCategoryUrl(BaseInfoRequest baseInfoRequest) {
        return baseInfoRequest.getUrl() == null ? CustomString.toSlug(baseInfoRequest.getName()) : baseInfoRequest.getUrl();
    }
}
