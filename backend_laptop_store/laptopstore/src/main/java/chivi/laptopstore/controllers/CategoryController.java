package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.requests.CategoryRequest;
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

    @GetMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "tree-view")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllCategory() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, categoryService.getTreeView());
    }

    @PostMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createCategory(@Valid @RequestBody CategoryRequest request) {
        categoryService.checkConflictByName(request.getName());
        CategoryEntity parent = categoryService.getById(request.getParentId());
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, categoryService.createCategoryChild(parent, request));
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{id}/edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        CategoryEntity category = categoryService.getById(id);
        if (!category.getName().equals(request.getName())) {
            categoryService.checkConflictByName(request.getName());
        }
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, categoryService.editCategory(category, request));
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{id}/move/{from}/{to}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse moveItem(@PathVariable Long id, @PathVariable Long from, @PathVariable Long to) {
        CategoryEntity child = categoryService.getById(id);
        CategoryEntity oldParent = categoryService.getById(from);
        CategoryEntity parent = categoryService.getById(to);

        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, categoryService.moveChildNewPosition(child, oldParent, parent));
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{parentId}/{childId}/delete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteCategory(@PathVariable Long parentId, @PathVariable Long childId) {
        CategoryEntity parent = categoryService.getById(parentId);
        CategoryEntity child = categoryService.getById(childId);

        categoryService.deleteCategory(parent, child);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }
}
