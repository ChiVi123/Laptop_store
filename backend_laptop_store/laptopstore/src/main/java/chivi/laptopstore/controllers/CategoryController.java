package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.models.requests.BaseInfoRequest;
import chivi.laptopstore.models.responses.ResponseModel;
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
    public ResponseModel findAllCategory() {
        return categoryService.findAllCategory();
    }

    @PostMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseModel createCategory(@Valid @RequestBody BaseInfoRequest baseInfoRequest) {
        return categoryService.createCategory(baseInfoRequest);
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "edit/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel editCategory(@PathVariable Long categoryId, @Valid @RequestBody BaseInfoRequest baseInfoRequest) {
        return categoryService.editCategory(categoryId, baseInfoRequest);
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "delete/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel deleteCategory(@PathVariable Long categoryId) {
        return categoryService.deleteCategory(categoryId);
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "delete-all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel deleteAllCategory() {
        return categoryService.deleteAllCategory();
    }
}
