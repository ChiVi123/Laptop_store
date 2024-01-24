package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.NotFoundException;
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

    public SuccessResponse createCategory(BaseInfoRequest baseInfoRequest) {
        this.handleConflictCategoryByName(baseInfoRequest.getName());

        String url = handleCategoryUrl(baseInfoRequest);
        CategoryEntity category = new CategoryEntity(baseInfoRequest.getName(), url);
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, categoryRepository.save(category));
    }

    public SuccessResponse editCategory(Long categoryId, BaseInfoRequest baseInfoRequest) {
        CategoryEntity category = this.handleFindCategoryById(categoryId);

        if (!category.getName().equals(baseInfoRequest.getName())) {
            this.handleConflictCategoryByName(baseInfoRequest.getName());
            String url = handleCategoryUrl(baseInfoRequest);
            category.setName(baseInfoRequest.getName());
            category.setUrl(url);
        }

        String url = handleCategoryUrl(baseInfoRequest);
        category.setName(baseInfoRequest.getName());
        category.setUrl(url);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, categoryRepository.save(category));
    }

    public SuccessResponse deleteCategory(Long categoryId) {
        CategoryEntity category = this.handleFindCategoryById(categoryId);
        categoryRepository.delete(category);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

    public SuccessResponse deleteAllCategory() {
        categoryRepository.deleteAll();
        return new SuccessResponse(ResponseMessage.DELETE_ALL_SUCCESS);
    }

    private String handleCategoryUrl(BaseInfoRequest baseInfoRequest) {
        return baseInfoRequest.getUrl() == null ? CustomString.toSlug(baseInfoRequest.getName()) : baseInfoRequest.getUrl();
    }

    private CategoryEntity handleFindCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("category", id));
    }

    private void handleConflictCategoryByName(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new ConflictException("Category", name);
        }
    }
}
