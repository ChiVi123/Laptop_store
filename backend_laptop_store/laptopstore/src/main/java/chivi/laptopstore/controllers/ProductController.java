package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.entities.CategoryEntity;
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

@Slf4j
@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final BrandService brandService;
    private final CategoryService categoryService;

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "find-all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllProduct() {
        return productService.findAllProduct();
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "{slug}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findBySlug(@PathVariable String slug) {
        log.error("Slug: {}", slug);
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, productService.getBySlug(slug));
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "sort-latest")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllLatest(
            @RequestParam(name = "page_number", defaultValue = "1") int pageNumber,
            @RequestParam(name = "page_size", defaultValue = "6") int pageSize
    ) {
        int currentPage = pageNumber - 1;
        Page<ProductEntity> productPage = productService.findAllLatest(PageRequest.of(currentPage, pageSize));
        PagePayload<ProductEntity> payload = new PagePayload<>(currentPage, productPage);
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, payload);
    }

    @PostMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse createProduct(@Valid @RequestBody ProductRequest productRequest) {
        productService.checkConflictByName(productRequest.getName());

        CategoryEntity category = categoryService.getById(productRequest.getCategoryId());
        BrandEntity brand = brandService.getById(productRequest.getBrandId());

        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, productService.createProduct(category, brand, productRequest));
    }

    @PutMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "edit/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateProduct(@PathVariable Long productId, @Valid @RequestBody ProductRequest productRequest) {
        ProductEntity product = productService.getById(productId);
        CategoryEntity category = categoryService.getById(productRequest.getCategoryId());
        BrandEntity brand = brandService.getById(productRequest.getBrandId());

        ProductEntity result = productService.updateProduct(product, category, brand, productRequest);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, result);
    }

    @PatchMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "discount/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateDiscountProduct(@PathVariable Long productId, @Valid @RequestBody DiscountRequest discountRequest) {
        ProductEntity product = productService.getById(productId);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, productService.updateDiscountProduct(product, discountRequest));
    }

    @DeleteMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "delete/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

}
