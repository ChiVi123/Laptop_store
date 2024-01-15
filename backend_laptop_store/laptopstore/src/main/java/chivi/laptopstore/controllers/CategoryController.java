package chivi.laptopstore.controllers;

import chivi.laptopstore.common.Values;
import chivi.laptopstore.communication.request.CategoryRequest;
import chivi.laptopstore.models.entities.CategoryModel;
import chivi.laptopstore.services.CategoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Values.API_V1)
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("categories")
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryModel> findAllCategory() {
        return categoryService.findAllCategory();
    }

    @PostMapping("categories/create")
    @ResponseStatus(HttpStatus.OK)
    public CategoryModel createCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
        return categoryService.createCategory(categoryRequest);
    }

    @PutMapping("categories/edit/{categoryID}")
    @ResponseStatus(HttpStatus.OK)
    public CategoryModel editCategory(@PathVariable("categoryID") Long categoryID, @Valid @RequestBody CategoryRequest categoryRequest) {
        return categoryService.editCategory(categoryID, categoryRequest);
    }
}
