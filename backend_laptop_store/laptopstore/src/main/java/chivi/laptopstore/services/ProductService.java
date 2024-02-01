package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.entities.ProductEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomBadRequestException;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.repositories.entities.IProductRepository;
import chivi.laptopstore.utils.CustomString;
import chivi.laptopstore.utils.PriceHandler;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;

@Slf4j
@Service
@AllArgsConstructor
public class ProductService {
    private final IProductRepository productRepository;

    public SuccessResponse findAllProduct() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, productRepository.findAll());
    }

    public Page<ProductEntity> findAllLatest(Pageable pageable) {
        return productRepository.findAllByOrderByCreatedDateDesc(pageable);
    }

    public ProductEntity getBySlug(String slug) {
        return productRepository.findBySlug(slug).orElseThrow(() -> new CustomNotFoundException("product", slug));
    }

    public ProductEntity getById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("product", id));
    }

    public void checkConflictByName(String name) {
        if (productRepository.existsByName(name)) {
            throw new ConflictException("Product", name);
        }
    }

    public ProductEntity createProduct(CategoryEntity category, BrandEntity brand, ProductRequest productRequest) {
        String slug = CustomString.toSlug(productRequest.getName());
        ProductEntity product = ProductEntity
                .builder()
                .name(productRequest.getName())
                .slug(slug)
                .price(productRequest.getPrice())
                .description(productRequest.getDescription())
                .category(category)
                .brand(brand)
                .build();

        return productRepository.save(product);
    }

    public ProductEntity updateProduct(ProductEntity product, CategoryEntity category, BrandEntity brand, ProductRequest productRequest) {
        if (!product.getName().equals(productRequest.getName())) {
            this.checkConflictByName(productRequest.getName());
            String slug = CustomString.toSlug(productRequest.getName());
            product.setName(productRequest.getName());
            product.setSlug(slug);
        }

        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription());
        product.setCategory(category);
        product.setBrand(brand);

        return productRepository.save(product);
    }

    public ProductEntity updateDiscountProduct(ProductEntity product, DiscountRequest discountRequest) {
        BigDecimal price = product.getPrice();
        BigDecimal discount = discountRequest.getDiscount();
        MathContext mathContext = new MathContext(4);

        if (price.compareTo(discount) < 0) {
            throw new CustomBadRequestException("Discount invalid");
        }

        BigDecimal rate = PriceHandler.discountRating(price, discount);

        product.setPrice(price);
        product.setDiscount(discount);
        product.setDiscountRate(rate.round(mathContext).floatValue());
        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        ProductEntity product = this.getById(productId);
        productRepository.delete(product);
    }
}
