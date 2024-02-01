package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.models.requests.BaseInfoRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import chivi.laptopstore.utils.CustomString;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CategoryService {
    private final ICategoryRepository categoryRepository;

    public SuccessResponse findAllCategory() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, categoryRepository.findAll());
    }

    public CategoryEntity getById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("category", id));
    }

    public void checkConflictByName(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new ConflictException("Category", name);
        }
    }

    public CategoryEntity createCategory(BaseInfoRequest baseInfoRequest) {
        String url = this.handleCategoryUrl(baseInfoRequest);
        CategoryEntity category = new CategoryEntity(baseInfoRequest.getName(), url);
        return categoryRepository.save(category);
    }

    public CategoryEntity editCategory(CategoryEntity category, BaseInfoRequest baseInfoRequest) {
        String url = handleCategoryUrl(baseInfoRequest);
        category.setName(baseInfoRequest.getName());
        category.setUrl(url);
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long categoryId) {
        CategoryEntity category = this.getById(categoryId);
        categoryRepository.delete(category);
    }

    private String handleCategoryUrl(BaseInfoRequest baseInfoRequest) {
        return baseInfoRequest.getUrl() == null ? CustomString.toSlug(baseInfoRequest.getName()) : baseInfoRequest.getUrl();
    }
}
