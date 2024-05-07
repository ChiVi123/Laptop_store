package chivi.laptopstore.services;

import chivi.laptopstore.configurations.CloudinaryConfig;
import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.CustomBadRequestException;
import chivi.laptopstore.exception.CustomNotFoundException;
import chivi.laptopstore.models.entities.CategoryInfo;
import chivi.laptopstore.models.entities.ImageEntity;
import chivi.laptopstore.models.entities.ProductDetail;
import chivi.laptopstore.models.entities.ProductInfo;
import chivi.laptopstore.models.requests.DiscountRequest;
import chivi.laptopstore.models.requests.ProductRequest;
import chivi.laptopstore.repositories.IProductDetailRepository;
import chivi.laptopstore.repositories.IProductInfoRepository;
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
import java.util.Set;

@Slf4j
@Service
@AllArgsConstructor
public class ProductService {
    private final IProductInfoRepository productInfoRepository;
    private final IProductDetailRepository productDetailRepository;
    private final CloudinaryConfig cloudinaryConfig;

    public List<ProductInfo> getAll() {
        return productInfoRepository.findAll();
    }

    public Page<ProductInfo> getAllLatest(Pageable pageable) {
        return productInfoRepository.findAllByOrderByCreatedDateDesc(pageable);
    }

    public ProductDetail getBySlug(String slug) {
        return productDetailRepository.findByInfo_Slug(slug).orElseThrow(() -> new CustomNotFoundException("product", slug));
    }

    public ProductInfo getInfoById(Long id) {
        return productInfoRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("product", id));
    }

    public ProductDetail getDetailById(Long id) {
        return productDetailRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("product", id));
    }

    public Page<ProductEntity> getAllByCategories(long categoryId, Pageable pageable) {
        return repository.findAllByCategories_Id(categoryId, pageable);
    }

    public void checkConflictByName(String name) {
        if (productInfoRepository.existsByName(name)) {
            throw new ConflictException("Product", name);
        }
    }

    public ProductDetail create(Set<CategoryInfo> categories, ProductRequest request) {
        ProductInfo productInfo = new ProductInfo();
        productInfo.setName(request.getName());
        productInfo.setSlug(request.getSlug());
        productInfo.setDescription(request.getDescription());
        productInfo.setPrice(request.getPrice());
        productInfo.setQuantityStock(request.getQuantityStock());
        productInfo.setStatus(request.getStatus());

        // Product info set thumbnail from request
        request.getImages().stream().findFirst().ifPresent(image -> productInfo.setThumbnailUrl(image.getSecureUrl()));

        ProductInfo resultProductInfo = productInfoRepository.save(productInfo);
        ProductDetail productDetail = new ProductDetail(resultProductInfo, categories, request.getImages());
        return productDetailRepository.save(productDetail);
    }

    public ProductDetail editInfo(ProductDetail productDetail, Set<CategoryInfo> categories, ProductRequest request) {
        ProductInfo productInfo = productDetail.getInfo();

        if (!productInfo.getName().equals(request.getName())) {
            this.checkConflictByName(request.getName());
            String slug = CustomString.toSlug(request.getName());
            productInfo.setName(request.getName());
            productInfo.setSlug(slug);
        }
        productInfo.setPrice(request.getPrice());
        productInfo.setDescription(request.getDescription());
        productInfo.setStatus(request.getStatus());
        productDetail.clearAllCategory();
        productDetail.addAllCategory(categories);
        productDetail.addImages(request.getImages());

        request.getImages().stream().findFirst().ifPresent(image -> productInfo.setThumbnailUrl(image.getSecureUrl()));

        productInfoRepository.save(productInfo);
        return productDetailRepository.save(productDetail);
    }

    public ProductInfo updateDiscount(ProductInfo productInfo, DiscountRequest discountRequest) {
        BigDecimal price = productInfo.getPrice();
        BigDecimal discount = discountRequest.getDiscount();
        MathContext mathContext = new MathContext(4);
        if (price.compareTo(discount) < 0) {
            throw new CustomBadRequestException("Discount invalid");
        }
        BigDecimal rate = PriceHandler.discountRating(price, discount);
        productInfo.setPrice(price);
        productInfo.setDiscount(discount);
        productInfo.setDiscountRate(rate.round(mathContext).floatValue());
        return productInfoRepository.save(productInfo);
    }

    public List<ImageEntity> removeImage(ProductDetail productDetail, Long publicId) {
        List<ImageEntity> images = productDetail.getImages();
        images.stream()
                .filter(entity -> entity.getId().equals(publicId))
                .findFirst()
                .ifPresent(image -> {
                    cloudinaryConfig.deleteImage(List.of(image.getPublicId()));
                    productDetail.removeImage(image);
                });

        ProductDetail result = productDetailRepository.save(productDetail);
        return result.getImages();
    }

    public void delete(ProductDetail productDetail) {
        List<String> publicIds = productDetail.getImages().stream().map(ImageEntity::getPublicId).toList();
        productDetail.clearAllCategory();

        if (publicIds.size() > 0) {
            cloudinaryConfig.deleteImage(publicIds);
        }
        productDetailRepository.delete(productDetail);
        productInfoRepository.delete(productDetail.getInfo());
    }
}
