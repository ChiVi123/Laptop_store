package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.services.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "find-all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllProduct() {
        return productService.findAllProduct();
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "{slug}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findBySlug(@PathVariable String slug) {
        return productService.findBySlug(slug);
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "sort-latest")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllLatest(
            @RequestParam(name = "page_number", defaultValue = "1") int pageNumber,
            @RequestParam(name = "page_size", defaultValue = "6") int pageSize
    ) {
        return productService.findAllProductLatest(PageRequest.of(pageNumber - 1, pageSize));
    }

    @PostMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse createProduct(@Valid @RequestBody ProductRequest productRequest) {
        return productService.createProduct(productRequest);
    }

    @PutMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "edit/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateProduct(@PathVariable Long productId, @Valid @RequestBody ProductRequest productRequest) {
        return productService.updateProduct(productId, productRequest);
    }

    @PatchMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "discount/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateDiscountProduct(@PathVariable Long productId, @Valid @RequestBody DiscountRequest discountRequest) {
        return productService.updateDiscountProduct(productId, discountRequest);
    }

    @DeleteMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "delete/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteProduct(@PathVariable Long productId) {
        return productService.deleteProduct(productId);
    }

    @DeleteMapping(RequestMaps.PRODUCT_PATHNAME_ADMIN + "delete-all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAllProduct() {
        return productService.deleteAllProduct();
    }
}
