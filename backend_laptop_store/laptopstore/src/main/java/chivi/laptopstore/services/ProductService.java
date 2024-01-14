package chivi.laptopstore.services;

import chivi.laptopstore.communication.request.ProductRequest;
import chivi.laptopstore.models.ProductModel;
import chivi.laptopstore.repositories.IProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {
    private final IProductRepository productRepository;

    public List<ProductModel> findAllProduct() {
        return productRepository.findAll();
    }

    public List<ProductModel> findAllProductSortPrice() {
        return productRepository.findAllByOrderByPriceDesc();
    }

    public ProductModel createProduct(ProductRequest productRequest) {
        return productRepository.save(ProductModel
                .builder()
                .name(productRequest.getName())
                .price(productRequest.getPrice())
                .build()
        );
    }
}
