package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(min = 8, max = 255)
    private String name;
    @NotNull(message = ValidationMessage.NOT_NULL)
    @DecimalMin(value = ValidationValues.DECIMAL_MIN, inclusive = false)
    private BigDecimal price;
    private BigDecimal discount;
    private String description;
    private Long categoryId;
    private Long brandId;
}
