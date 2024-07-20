package chivi.laptopstore.services;

import chivi.laptopstore.communication.requests.DiscountRequest;
import chivi.laptopstore.communication.requests.ProductRequest;
import chivi.laptopstore.configurations.CloudinaryConfig;
import chivi.laptopstore.exception.BadRequestException;
import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.*;
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
        return productInfoRepository.findAllByOrderByCreatedDateDesc();
    }

    public Page<ProductInfo> getAllByQuery(String query, Pageable pageable) {
        return productInfoRepository.searchByQuery(query, pageable);
    }

    public Page<ProductInfo> getAllByCategoryIds(List<Long> categoryIds, Pageable pageable) {
        return productInfoRepository.findAllByCategories(categoryIds, pageable);
    }

    public ProductDetail getBySlug(String slug) {
        return productDetailRepository.findByInfo_Slug(slug).orElseThrow(() -> new NotFoundDataException("product", slug));
    }

    public ProductInfo getInfoById(Long id) {
        return productInfoRepository.findById(id).orElseThrow(() -> new NotFoundDataException("product", id));
    }

    public ProductDetail getDetailById(Long id) {
        return productDetailRepository.findById(id).orElseThrow(() -> new NotFoundDataException("product", id));
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
        ProductDetail productDetail = new ProductDetail(resultProductInfo, categories, request.getImages(), request.getAttributes());
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

        productDetail.setCategories(categories);
        productDetail.addAllAttribute(request.getAttributes());
        productDetail.addAllImage(request.getImages());

        request.getImages().stream().findFirst().ifPresent(image -> productInfo.setThumbnailUrl(image.getSecureUrl()));

        productInfoRepository.save(productInfo);
        return productDetailRepository.save(productDetail);
    }

    public ProductInfo updateDiscount(ProductInfo productInfo, DiscountRequest discountRequest) {
        BigDecimal price = productInfo.getPrice();
        BigDecimal discount = discountRequest.getDiscount();
        MathContext mathContext = new MathContext(4);
        if (price.compareTo(discount) < 0) {
            throw new BadRequestException("Discount invalid");
        }
        BigDecimal rate = PriceHandler.discountRating(price, discount);
        productInfo.setPrice(price);
        productInfo.setDiscount(discount);
        productInfo.setDiscountRate(rate.round(mathContext).floatValue());
        return productInfoRepository.save(productInfo);
    }

    public void updateStock(ProductInfo productInfo, int stock) {
        productInfo.setQuantityStock(stock);
        productInfoRepository.save(productInfo);
    }

    public void removeAttribute(ProductDetail productDetail, Attribute attribute) {
        productDetail.removeAttribute(attribute);
        productDetailRepository.save(productDetail);
    }

    public List<Image> removeImage(ProductDetail productDetail, Image image) {
        cloudinaryConfig.deleteImage(List.of(image.getPublicId()));
        productDetail.removeImage(image);
        ProductDetail result = productDetailRepository.save(productDetail);
        return result.getImages();
    }

    public void updateAllQuantitySold(List<OrderItem> items) {
        List<ProductInfo> products = items.stream().map(item -> {
            var product = item.getProduct();
            int sold = product.getQuantitySold();
            int quantity = item.getQuantity();

            product.setQuantitySold(sold + quantity);
            return product;
        }).toList();
        productInfoRepository.saveAll(products);
    }

    public void restoreFromCartItem(List<CartItem> items) {
        List<ProductInfo> products = items.stream().map(item -> {
            var product = item.getProduct();
            int stock = product.getQuantityStock();
            int quantity = item.getQuantity();

            product.setQuantityStock(stock + quantity);
            return product;
        }).toList();
        productInfoRepository.saveAll(products);
    }

    public void restoreFromOrderItem(List<OrderItem> items) {
        List<ProductInfo> products = items.stream().map(item -> {
            var product = item.getProduct();
            int stock = product.getQuantityStock();
            int quantity = item.getQuantity();

            product.setQuantityStock(stock + quantity);
            return product;
        }).toList();
        productInfoRepository.saveAll(products);
    }

    public void delete(ProductDetail productDetail) {
        List<String> publicIds = productDetail.getImages().stream().map(Image::getPublicId).toList();
        productDetail.clearAllCategory();

        if (!publicIds.isEmpty()) {
            cloudinaryConfig.deleteImage(publicIds);
        }
        productDetailRepository.delete(productDetail);
        productInfoRepository.delete(productDetail.getInfo());
    }
}
