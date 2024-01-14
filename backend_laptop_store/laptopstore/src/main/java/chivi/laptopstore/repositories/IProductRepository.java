package chivi.laptopstore.repositories;

import chivi.laptopstore.models.ProductModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends MongoRepository<ProductModel, String> {
    List<ProductModel> findAllByOrderByPriceDesc();
}
