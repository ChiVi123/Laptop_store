package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.communication.payload.PagePayload;
import chivi.laptopstore.models.entities.CategoryInfo;
import chivi.laptopstore.models.entities.ProductDetail;
import chivi.laptopstore.models.entities.ProductInfo;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.services.CategoryService;
import chivi.laptopstore.services.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Slf4j
@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getAllProduct() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, productService.getAll());
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "{slug}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getProductBySlug(@PathVariable String slug) {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, productService.getBySlug(slug));
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "sort-latest")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllLatest(
            @RequestParam(name = "page_number", defaultValue = "1") int pageNumber,
            @RequestParam(name = "page_size", defaultValue = "6") int pageSize
    ) {
        int currentPage = pageNumber - 1;
        Page<ProductInfo> productPage = productService.getAllLatest(PageRequest.of(currentPage, pageSize));
        PagePayload<ProductInfo> payload = new PagePayload<>(currentPage, productPage);
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, payload);
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "collection")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllByCategory(
            @RequestParam(name = "category_id", defaultValue = "1") long categoryId,
            @RequestParam(name = "page_number", defaultValue = "1") int pageNumber,
            @RequestParam(name = "page_size", defaultValue = "6") int pageSize
    ) {
        int currentPage = pageNumber - 1;
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        Page<ProductEntity> productPage = productService.getAllByCategories(categoryId, pageable);
        PagePayload<ProductEntity> payload = new PagePayload<>(currentPage, productPage);
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, payload);
    }

    @PostMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse createProduct(@Valid @RequestBody ProductRequest request) {
        productService.checkConflictByName(request.getName());
        Set<CategoryInfo> categories = categoryService.getAllByIds(request.getCategoryIds());
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, productService.create(categories, request));
    }

    @PutMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "{id}/edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        ProductDetail product = productService.getDetailById(id);
        Set<CategoryInfo> categories = categoryService.getAllByIds(request.getCategoryIds());
        ProductDetail result = productService.editInfo(product, categories, request);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, result);
    }

    @PatchMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "{id}/discount")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateDiscountProduct(@PathVariable Long id, @Valid @RequestBody DiscountRequest request) {
        ProductInfo product = productService.getInfoById(id);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, productService.updateDiscount(product, request));
    }

    @DeleteMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "{productId}/remove-image/{imageId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse removeImageProduct(@PathVariable Long productId, @PathVariable Long imageId) {
        ProductDetail product = productService.getDetailById(productId);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS, productService.removeImage(product, imageId));
    }

    @DeleteMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "{id}/delete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteProduct(@PathVariable Long id) {
        ProductDetail product = productService.getDetailById(id);
        productService.delete(product);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

}
