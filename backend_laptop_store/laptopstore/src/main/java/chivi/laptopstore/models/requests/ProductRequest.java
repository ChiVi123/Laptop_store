package chivi.laptopstore.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank(message = "Name not blank")
    private String name;
    private BigDecimal price;
    private String description;
    private Long categoryId;
    private Long brandId;
}
