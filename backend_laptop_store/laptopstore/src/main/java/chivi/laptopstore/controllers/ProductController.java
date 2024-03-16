package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.entities.ImageEntity;
import chivi.laptopstore.models.entities.ProductEntity;
import chivi.laptopstore.models.payloads.PagePayload;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.services.BrandService;
import chivi.laptopstore.services.CategoryService;
import chivi.laptopstore.services.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final BrandService brandService;
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
        Page<ProductEntity> productPage = productService.getAllLatest(PageRequest.of(currentPage, pageSize));
        PagePayload<ProductEntity> payload = new PagePayload<>(currentPage, productPage);
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, payload);
    }

    @PostMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse createProduct(@Valid @RequestBody ProductRequest request) {
        productService.checkConflictByName(request.getName());

        CategoryEntity category = categoryService.getById(request.getCategoryId());
        BrandEntity brand = brandService.getById(request.getBrandId());
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, productService.create(category, brand, request));
    }

    @PutMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "{id}/add-all-image")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse addAllImage(@PathVariable Long id, @RequestBody List<ImageEntity> images) {
        ProductEntity product = productService.getById(id);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, productService.addImagesProduct(product, images));
    }

    @PutMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "{id}/edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        ProductEntity product = productService.getById(id);
        CategoryEntity category = categoryService.getById(request.getCategoryId());
        BrandEntity brand = brandService.getById(request.getBrandId());
        ProductEntity result = productService.editInfo(product, category, brand, request);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, result);
    }

    @PatchMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "{id}/discount")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateDiscountProduct(@PathVariable Long id, @Valid @RequestBody DiscountRequest request) {
        ProductEntity product = productService.getById(id);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, productService.updateDiscount(product, request));
    }

    @DeleteMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "{id}/delete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

}
