package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.entities.ProductEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomBadRequestException;
import chivi.laptopstore.models.exceptions.NotFoundException;
import chivi.laptopstore.models.payloads.PagePayload;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.repositories.entities.IBrandRepository;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
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
    private final ICategoryRepository categoryRepository;
    private final IBrandRepository brandRepository;

    public SuccessResponse findAllProduct() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, productRepository.findAll());
    }

    public SuccessResponse findAllProductLatest(Pageable pageable) {
        Page<ProductEntity> productPage = productRepository.findAllByOrderByCreatedDateDesc(pageable);
        PagePayload<ProductEntity> payload = new PagePayload<>(pageable.getPageNumber(), productPage);
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, payload);
    }

    public SuccessResponse findBySlug(String slug) {
        ProductEntity product = this.handleFindProductBySlug(slug);
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, product);
    }

    public SuccessResponse createProduct(ProductRequest productRequest) {
        this.handleConflictProductByName(productRequest.getName());

        CategoryEntity category = this.handleFindCategoryById(productRequest.getCategoryId());
        BrandEntity brand = this.handleFindBrandById(productRequest.getBrandId());
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

        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, productRepository.save(product));
    }

    public SuccessResponse updateProduct(Long productId, ProductRequest productRequest) {
        ProductEntity product = this.handleFindProductById(productId);

        if (!product.getName().equals(productRequest.getName())) {
            this.handleConflictProductByName(productRequest.getName());
            String slug = CustomString.toSlug(productRequest.getName());
            product.setName(productRequest.getName());
            product.setSlug(slug);
        }

        CategoryEntity category = this.handleFindCategoryById(productRequest.getCategoryId());
        BrandEntity brand = this.handleFindBrandById(productRequest.getBrandId());

        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription());
        product.setCategory(category);
        product.setBrand(brand);

        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, productRepository.save(product));
    }

    public SuccessResponse updateDiscountProduct(Long productId, DiscountRequest discountRequest) {
        ProductEntity product = this.handleFindProductById(productId);
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
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, productRepository.save(product));
    }

    public SuccessResponse deleteProduct(Long productId) {
        ProductEntity product = this.handleFindProductById(productId);
        productRepository.delete(product);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

    public SuccessResponse deleteAllProduct() {
        productRepository.deleteAll();
        return new SuccessResponse(ResponseMessage.DELETE_ALL_SUCCESS);
    }

    private ProductEntity handleFindProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new NotFoundException("product", id));
    }

    private ProductEntity handleFindProductBySlug(String slug) {
        return productRepository.findBySlug(slug).orElseThrow(() -> new NotFoundException("product", slug));
    }

    private CategoryEntity handleFindCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("category", id));
    }

    private BrandEntity handleFindBrandById(Long id) {
        return brandRepository.findById(id).orElseThrow(() -> new NotFoundException("brand", id));
    }

    private void handleConflictProductByName(String name) {
        if (productRepository.existsByName(name)) {
            throw new ConflictException("Product", name);
        }
    }
}
