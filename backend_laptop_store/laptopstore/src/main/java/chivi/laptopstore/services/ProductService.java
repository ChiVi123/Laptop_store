package chivi.laptopstore.services;

import chivi.laptopstore.configurations.CloudinaryConfig;
import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.CustomBadRequestException;
import chivi.laptopstore.exception.CustomNotFoundException;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.entities.ImageEntity;
import chivi.laptopstore.models.entities.ProductEntity;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.repositories.IProductRepository;
import chivi.laptopstore.utils.CustomString;
import chivi.laptopstore.utils.PriceHandler;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class ProductService {
    private final IProductRepository repository;
    private final CloudinaryConfig cloudinaryConfig;

    public List<ProductEntity> getAll() {
        return repository.findAll();
    }

    public Page<ProductEntity> getAllLatest(Pageable pageable) {
        return repository.findAllByOrderByCreatedDateDesc(pageable);
    }

    public ProductEntity getBySlug(String slug) {
        return repository.findBySlug(slug).orElseThrow(() -> new CustomNotFoundException("product", slug));
    }

    public ProductEntity getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new CustomNotFoundException("product", id));
    }

    public void checkConflictByName(String name) {
        if (repository.existsByName(name)) {
            throw new ConflictException("Product", name);
        }
    }

    public ProductEntity create(CategoryEntity category, BrandEntity brand, ProductRequest request) {
        ProductEntity product = new ProductEntity();
        product.setName(request.getName());
        product.setSlug(request.getSlug());
        product.setCategory(category);
        product.setBrand(brand);
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantityStock(request.getQuantityStock());
        product.setImages(request.getImages());
        product.setStatus(request.getStatus());
        return repository.save(product);
    }

    public ProductEntity editInfo(ProductEntity product, CategoryEntity category, BrandEntity brand, ProductRequest request) {
        if (!product.getName().equals(request.getName())) {
            this.checkConflictByName(request.getName());
            String slug = CustomString.toSlug(request.getName());
            product.setName(request.getName());
            product.setSlug(slug);
        }

        product.setCategory(category);
        product.setBrand(brand);
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setStatus(request.getStatus());

        request.getImages().forEach(product::addImage);

        return repository.save(product);
    }

    public ProductEntity updateDiscount(ProductEntity product, DiscountRequest discountRequest) {
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
        return repository.save(product);
    }

    public List<ImageEntity> removeImage(ProductEntity product, Long publicId) {
        Optional<ImageEntity> imageOptional = product.getImages().stream().filter(entity -> entity.getId().equals(publicId)).findFirst();
        if (imageOptional.isPresent()) {
            ImageEntity image = imageOptional.get();
            cloudinaryConfig.deleteImage(image.getPublicId());
            product.removeImage(image);
        }
        ProductEntity result = repository.save(product);
        return result.getImages();
    }

    public void delete(ProductEntity product) {
        product.getImages().forEach(image -> {
            cloudinaryConfig.deleteImage(image.getPublicId());
        });
        repository.delete(product);
    }
}
