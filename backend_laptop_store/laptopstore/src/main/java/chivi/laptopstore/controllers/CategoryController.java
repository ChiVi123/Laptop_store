package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.CategoryInfo;
import chivi.laptopstore.models.CategoryNode;
import chivi.laptopstore.communication.requests.CategoryRequest;
import chivi.laptopstore.communication.responses.SuccessResponse;
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

    @GetMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "root")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findRootCategory() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, categoryService.getRoot());
    }

    @GetMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "info-id/{id}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findCategoryNodeByInfoId(@PathVariable Long id) {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, categoryService.getNodeByInfoId(id));
    }

    @GetMapping(RequestMaps.CATEGORY_PATHNAME_PUBLIC + "{id}/info")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findCategoryInfoById(@PathVariable Long id) {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, categoryService.getInfoById(id));
    }

    @PostMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createCategory(@Valid @RequestBody CategoryRequest request) {
        categoryService.checkConflictByName(request.getName());
        CategoryNode parent = categoryService.getNodeById(request.getParentId());
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, categoryService.create(parent, request));
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{id}/edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        CategoryNode categoryNode = categoryService.getNodeById(id);
        CategoryInfo categoryInfo = categoryNode.getInfo();
        if (!categoryInfo.getName().equals(request.getName())) {
            categoryService.checkConflictByName(request.getName());
        }
        categoryInfo = categoryService.editInfo(categoryInfo, request);
        categoryNode.setInfo(categoryInfo);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, categoryNode);
    }

    @PutMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{fromId}/move/{toId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse moveItem(@PathVariable Long fromId, @PathVariable Long toId) {
        CategoryNode fromCategory = categoryService.getNodeById(fromId);
        CategoryNode toCategory = categoryService.getNodeById(toId);
        categoryService.move(fromCategory, toCategory);
        return new SuccessResponse("Move category successfully!!!");
    }

    @DeleteMapping(RequestMaps.CATEGORY_PATHNAME_ADMIN + "{id}/delete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteCategory(@PathVariable Long id) {
        CategoryNode category = categoryService.getNodeById(id);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS, categoryService.deleteChild(category));
    }
}
