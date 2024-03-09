package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.exceptions.BaseException;
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

    @GetMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "{id}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findCategoryById(@PathVariable Long id) {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, categoryService.getById(id));
    }

    @PostMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "create-root")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createCategoryRoot(@Valid @RequestBody CategoryRequest request) {
        categoryService.checkConflictByName(request.getName());
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, categoryService.createRoot(request));
    }

    @PostMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createCategory(@Valid @RequestBody CategoryRequest request) {
        categoryService.checkConflictByName(request.getName());
        CategoryEntity parent = categoryService.getById(request.getParentId());
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, categoryService.saveChild(parent, request));
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{id}/edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        CategoryEntity category = categoryService.getById(id);
        if (!category.getName().equals(request.getName())) {
            categoryService.checkConflictByName(request.getName());
        }
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, categoryService.editInfo(category, request));
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{id}/move/{from}/{to}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse moveItem(@PathVariable Long id, @PathVariable Long from, @PathVariable Long to) {
        CategoryEntity child = categoryService.getById(id);
        CategoryEntity oldParent = categoryService.getById(from);
        CategoryEntity parent = categoryService.getById(to);
        if (parent.getChildren().contains(child)) {
            String format = "Child has id: %d already parent id: %d";
            String message = String.format(format, child.getId(), parent.getId());
            throw new BaseException(HttpStatus.CONFLICT.value(), message);
        }
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, categoryService.moveChildNewPosition(child, oldParent, parent));
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{parentId}/{childId}/delete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteCategoryChild(@PathVariable Long parentId, @PathVariable Long childId) {
        CategoryEntity parent = categoryService.getById(parentId);
        CategoryEntity child = categoryService.getById(childId);
        categoryService.deleteChild(parent, child);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{id}/delete-root")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteCategory(@PathVariable Long id) {
        CategoryEntity category = categoryService.getById(id);
        if (category.getLevel() != 0) {
            throw new BaseException(HttpStatus.BAD_REQUEST.value(), "Category must root level");
        }
        categoryService.deleteEntity(category);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }
}
