package chivi.laptopstore.controllers;

import chivi.laptopstore.communication.request.ProductRequest;
import chivi.laptopstore.models.ProductModel;
import chivi.laptopstore.services.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("products")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductModel> findAllProduct() {
        return productService.findAllProduct();
    }

    @GetMapping("products/orderByPrice/orderDesc")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductModel> findAllProductSortPrice() {
        return productService.findAllProductSortPrice();
    }

    @PostMapping("products/create")
    @ResponseStatus(HttpStatus.OK)
    public ProductModel createProduct(@Valid @RequestBody ProductRequest productRequest) {
        return productService.createProduct(productRequest);
    }
}
