package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
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
        return categoryService.createCategory(baseInfoRequest);
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "edit/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editCategory(@PathVariable Long categoryId, @Valid @RequestBody BaseInfoRequest baseInfoRequest) {
        return categoryService.editCategory(categoryId, baseInfoRequest);
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "delete/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteCategory(@PathVariable Long categoryId) {
        return categoryService.deleteCategory(categoryId);
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "delete-all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAllCategory() {
        return categoryService.deleteAllCategory();
    }
}
