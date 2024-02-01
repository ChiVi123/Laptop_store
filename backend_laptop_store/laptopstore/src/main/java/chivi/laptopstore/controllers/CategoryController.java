package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.requests.BaseInfoRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.services.CategoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "find-all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllCategory() {
        return categoryService.findAllCategory();
    }

    @PostMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createCategory(@Valid @RequestBody BaseInfoRequest baseInfoRequest) {
        categoryService.checkConflictByName(baseInfoRequest.getName());
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, categoryService.createCategory(baseInfoRequest));
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "edit/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editCategory(@PathVariable Long categoryId, @Valid @RequestBody BaseInfoRequest baseInfoRequest) {
        CategoryEntity category = categoryService.getById(categoryId);
        if (!category.getName().equals(baseInfoRequest.getName())) {
            categoryService.checkConflictByName(baseInfoRequest.getName());
        }
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, categoryService.editCategory(category, baseInfoRequest));
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "delete/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }
}
