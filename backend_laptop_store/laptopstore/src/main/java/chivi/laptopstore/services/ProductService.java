package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.entities.ProductEntity;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.models.responses.ResponseModel;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import chivi.laptopstore.repositories.entities.IProductRepository;
import chivi.laptopstore.utils.CustomString;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {
    private final IProductRepository productRepository;

    private final ICategoryRepository categoryRepository;

    public ResponseModel findAllProduct() {
        return new ResponseModel(true, "Success", productRepository.findAll());
    }

    public ResponseModel findAllProductLatest(Pageable pageable) {
        Page<ProductEntity> productEntityPage = productRepository.findAllByOrderByCreatedDateDesc(pageable);
        Map<String, Object> result = new HashMap<>();

        result.put("lastPage", productEntityPage.getTotalPages());
        result.put("list", productEntityPage.getContent());
        return new ResponseModel(true, "Success", result);
    }

    public ResponseModel findBySlug(String slug) {
        Optional<ProductEntity> optionalProduct = productRepository.findBySlug(slug);
        if (optionalProduct.isEmpty()) {
            return new ResponseModel(false, "Can't found by key " + slug, new ProductEntity());
        }
        return new ResponseModel(true, "Success", optionalProduct.get());
    }

    public ResponseModel createProduct(ProductRequest productRequest) {
        Optional<CategoryEntity> optionalCategory = categoryRepository.findById(productRequest.getCategoryId());
        if (optionalCategory.isEmpty()) {
            return new ResponseModel(false, "Can't found category", new ProductEntity());
        }

        String slug = CustomString.toSlug(productRequest.getName());
        ProductEntity productEntity = ProductEntity
                .builder()
                .name(productRequest.getName())
                .slug(slug)
                .price(productRequest.getPrice())
                .description(productRequest.getDescription())
                .category(optionalCategory.get())
                .build();

        return new ResponseModel(true, "Create success", productRepository.save(productEntity));
    }

    public ResponseModel deleteProduct(Long productId) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return new ResponseModel(false, "Can't found product", "");
        }

        productRepository.delete(optionalProduct.get());
        return new ResponseModel(true, "Delete product success", "");
    }
}
