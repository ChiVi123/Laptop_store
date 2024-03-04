package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.EEntityStatus;
import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import chivi.laptopstore.models.entities.ImageEntity;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(min = 8, max = 255)
    private String name;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private Long categoryId;

    private Long brandId;

    @NotBlank(message = ValidationMessage.NOT_BLANK)
    private String description;

    @NotNull(message = ValidationMessage.NOT_NULL)
    @DecimalMin(value = ValidationValues.DECIMAL_MIN, inclusive = false)
    private BigDecimal price;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private int quantityStock;

    private BigDecimal discount;

    private List<ImageEntity> images;
    
    @NotNull(message = ValidationMessage.NOT_NULL)
    private EEntityStatus status;
}
