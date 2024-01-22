package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.entities.ProductEntity;
import chivi.laptopstore.models.exceptions.BaseException;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.models.responses.ResponseModel;
import chivi.laptopstore.repositories.entities.IBrandRepository;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import chivi.laptopstore.repositories.entities.IProductRepository;
import chivi.laptopstore.utils.CustomString;
import chivi.laptopstore.utils.PriceHandler;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class ProductService {
    private final IProductRepository productRepository;
    private final ICategoryRepository categoryRepository;
    private final IBrandRepository brandRepository;

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
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't found product has key: " + slug);
        }
        return new ResponseModel(true, "Success", optionalProduct.get());
    }

    public ResponseModel createProduct(ProductRequest productRequest) {
        Optional<CategoryEntity> optionalCategory = categoryRepository.findById(productRequest.getCategoryId());
        if (optionalCategory.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't found category");
        }

        Optional<BrandEntity> optionalBrand = brandRepository.findById(productRequest.getBrandId());
        if (optionalBrand.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't found brand");
        }

        String slug = CustomString.toSlug(productRequest.getName());
        ProductEntity productEntity = ProductEntity
                .builder()
                .name(productRequest.getName())
                .slug(slug)
                .price(productRequest.getPrice())
                .description(productRequest.getDescription())
                .category(optionalCategory.get())
                .brand(optionalBrand.get())
                .build();

        return new ResponseModel(true, "Create success", productRepository.save(productEntity));
    }

    public ResponseModel updateProduct(Long productId, ProductRequest productRequest) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't found product");
        }

        Optional<CategoryEntity> optionalCategory = categoryRepository.findById(productRequest.getCategoryId());
        if (optionalCategory.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't found category");
        }

        Optional<BrandEntity> optionalBrand = brandRepository.findById(productRequest.getBrandId());
        if (optionalBrand.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't found brand");
        }

        String slug = CustomString.toSlug(productRequest.getName());
        ProductEntity productEntity = optionalProduct.get();

        productEntity.setName(productRequest.getName());
        productEntity.setSlug(slug);
        productEntity.setPrice(productRequest.getPrice());
        productEntity.setDescription(productRequest.getDescription());
        productEntity.setCategory(optionalCategory.get());
        productEntity.setBrand(optionalBrand.get());

        return new ResponseModel(true, "Update success", productRepository.save(productEntity));
    }

    public ResponseModel updateDiscountProduct(Long productId, DiscountRequest discountRequest) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't found product");
        }

        ProductEntity productEntity = optionalProduct.get();
        BigDecimal price = productEntity.getPrice();
        BigDecimal discount = discountRequest.getDiscount();
        MathContext mathContext = new MathContext(4);

        if (price.compareTo(discount) < 0) {
            throw new BaseException(HttpStatus.BAD_REQUEST.value(), "Discount invalid");
        }

        BigDecimal rate = PriceHandler.discountRating(price, discount);

        productEntity.setPrice(price);
        productEntity.setDiscount(discount);
        productEntity.setDiscountRate(rate.round(mathContext).floatValue());
        return new ResponseModel(true, "Update discount success", productRepository.save(productEntity));
    }

    public ResponseModel deleteProduct(Long productId) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't found product");
        }

        productRepository.delete(optionalProduct.get());
        return new ResponseModel(true, "Delete product success", "");
    }

    public ResponseModel deleteAllProduct() {
        productRepository.deleteAll();
        return new ResponseModel(true, "Delete all product success", "");
    }
}
