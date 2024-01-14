package chivi.laptopstore.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

@Document(collection = "products")
@Getter
@Setter
public class ProductModel extends Model {
    private String name;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal price;

    @Builder
    public ProductModel(String name, BigDecimal price) {
        super();
        this.name = name;
        this.price = price;
    }
}
