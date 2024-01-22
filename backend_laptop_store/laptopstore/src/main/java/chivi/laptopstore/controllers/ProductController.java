package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.models.responses.ResponseModel;
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

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "find-all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel findAllProduct() {
        return productService.findAllProduct();
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "{slug}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel findBySlug(@PathVariable String slug) {
        return productService.findBySlug(slug);
    }

    @GetMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "sort-latest")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel findAllLatest(
            @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "6") int pageSize
    ) {
        return productService.findAllProductLatest(PageRequest.of(pageNumber - 1, pageSize));
    }

    @PostMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "create")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel createProduct(@Valid @RequestBody ProductRequest productRequest) {
        return productService.createProduct(productRequest);
    }

    @PutMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "edit/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel updateProduct(@PathVariable Long productId, @Valid @RequestBody ProductRequest productRequest) {
        return productService.updateProduct(productId, productRequest);
    }

    @PutMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "discount/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel updateDiscountProduct(@PathVariable Long productId, @Valid @RequestBody DiscountRequest discountRequest) {
        return productService.updateDiscountProduct(productId, discountRequest);
    }

    @DeleteMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "delete/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel deleteProduct(@PathVariable Long productId) {
        return productService.deleteProduct(productId);
    }

    @DeleteMapping(RequestMaps.PRODUCT_PATHNAME_PUBLIC + "delete-all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel deleteAllProduct() {
        return productService.deleteAllProduct();
    }
}
