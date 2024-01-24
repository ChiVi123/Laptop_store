package chivi.laptopstore.database;

import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.entities.CategoryEntity;
import chivi.laptopstore.models.entities.ProductEntity;
import chivi.laptopstore.repositories.entities.IBrandRepository;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import chivi.laptopstore.repositories.entities.IProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@AllArgsConstructor
public class InitialDataLoader implements CommandLineRunner {
    private final ICategoryRepository categoryRepository;
    private final IBrandRepository brandRepository;
    private final IProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        this.initialCategory();
        this.initialBrand();
        this.initialProduct();
    }

    private void initialCategory() {
        if (!categoryRepository.findAll().isEmpty()) {
            log.info("Categories have already");
            return;
        }
        List<CategoryEntity> categoryEntities = new ArrayList<>();
        CategoryEntity category1 = new CategoryEntity("Category 1", "category-1");
        CategoryEntity category2 = new CategoryEntity("Category 2", "category-2");
        CategoryEntity category3 = new CategoryEntity("Category 3", "category-3");
        CategoryEntity category4 = new CategoryEntity("Category 4", "category-4");
        CategoryEntity category5 = new CategoryEntity("Category 5", "category-5");

        categoryEntities.add(category1);
        categoryEntities.add(category2);
        categoryEntities.add(category3);
        categoryEntities.add(category4);
        categoryEntities.add(category5);

        log.info("Insert categories: {} item", categoryRepository.saveAll(categoryEntities).size());
    }

    private void initialBrand() {
        if (!brandRepository.findAll().isEmpty()) {
            log.info("Brands have already");
            return;
        }
        List<BrandEntity> brandEntities = new ArrayList<>();
        BrandEntity brand1 = new BrandEntity("Brand 1", "brand-1");
        BrandEntity brand2 = new BrandEntity("Brand 2", "brand-2");
        BrandEntity brand3 = new BrandEntity("Brand 3", "brand-3");
        BrandEntity brand4 = new BrandEntity("Brand 4", "brand-4");
        BrandEntity brand5 = new BrandEntity("Brand 5", "brand-5");

        brandEntities.add(brand1);
        brandEntities.add(brand2);
        brandEntities.add(brand3);
        brandEntities.add(brand4);
        brandEntities.add(brand5);

        log.info("Insert brands: {} item", brandRepository.saveAll(brandEntities).size());
    }

    private void initialProduct() {
        if (!productRepository.findAll().isEmpty()) {
            log.info("Products have already");
            return;
        }

        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        if (categoryEntities.isEmpty()) {
            log.info("Categories empty");
            return;
        }

        List<BrandEntity> brandEntities = brandRepository.findAll();
        if (brandEntities.isEmpty()) {
            log.info("Brands empty");
            return;
        }

        List<ProductEntity> productEntities = new ArrayList<>();
        ProductEntity product1 = ProductEntity
                .builder()
                .name("Product 1")
                .slug("product-1")
                .price(new BigDecimal(100000))
                .description("dang cap nhat")
                .category(categoryEntities.get(0))
                .brand(brandEntities.get(4))
                .build();
        ProductEntity product2 = ProductEntity
                .builder()
                .name("Product 2")
                .slug("product-2")
                .price(new BigDecimal(120000))
                .description("dang cap nhat")
                .brand(brandEntities.get(0))
                .build();
        ProductEntity product3 = ProductEntity
                .builder()
                .name("Product 3")
                .slug("product-3")
                .price(new BigDecimal(80000))
                .description("dang cap nhat")
                .category(categoryEntities.get(4))
                .brand(brandEntities.get(1))
                .build();
        ProductEntity product4 = ProductEntity
                .builder()
                .name("Product 4")
                .slug("product-4")
                .price(new BigDecimal(30000))
                .description("dang cap nhat")
                .category(categoryEntities.get(2))
                .brand(brandEntities.get(3))
                .build();
        ProductEntity product5 = ProductEntity
                .builder()
                .name("Product 5")
                .slug("product-5")
                .price(new BigDecimal(30000))
                .description("dang cap nhat")
                .category(categoryEntities.get(2))
                .brand(brandEntities.get(0))
                .build();
        ProductEntity product6 = ProductEntity
                .builder()
                .name("Product 6")
                .slug("product-6")
                .price(new BigDecimal(70000))
                .description("dang cap nhat")
                .brand(brandEntities.get(2))
                .build();
        ProductEntity product7 = ProductEntity
                .builder()
                .name("Product 7")
                .slug("product-7")
                .price(new BigDecimal(80000))
                .description("dang cap nhat")
                .category(categoryEntities.get(1))
                .brand(brandEntities.get(1))
                .build();
        ProductEntity product8 = ProductEntity
                .builder()
                .name("Product 8")
                .slug("product-8")
                .price(new BigDecimal(95000))
                .description("dang cap nhat")
                .category(categoryEntities.get(3))
                .brand(brandEntities.get(4))
                .build();
        ProductEntity product9 = ProductEntity
                .builder()
                .name("Product 9")
                .slug("product-9")
                .price(new BigDecimal(63000))
                .description("dang cap nhat")
                .category(categoryEntities.get(1))
                .brand(brandEntities.get(3))
                .build();
        ProductEntity product10 = ProductEntity
                .builder()
                .name("Product 10")
                .slug("product-10")
                .price(new BigDecimal(28000))
                .description("dang cap nhat")
                .brand(brandEntities.get(0))
                .build();

        productEntities.add(product1);
        productEntities.add(product2);
        productEntities.add(product3);
        productEntities.add(product4);
        productEntities.add(product5);
        productEntities.add(product6);
        productEntities.add(product7);
        productEntities.add(product8);
        productEntities.add(product9);
        productEntities.add(product10);

        log.info("Insert products: {} item", productRepository.saveAll(productEntities).size());
    }
}
