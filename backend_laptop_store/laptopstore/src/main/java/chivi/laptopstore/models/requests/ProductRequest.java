package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.EntityStatus;
import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import chivi.laptopstore.models.entities.ImageEntity;
import chivi.laptopstore.utils.CustomString;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Setter
public class ProductRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(min = 8, max = 255)
    private String name;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private Long categoryId;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private Long brandId;

    @NotBlank(message = ValidationMessage.NOT_BLANK)
    private String description;

    @NotNull(message = ValidationMessage.NOT_NULL)
    @DecimalMin(value = ValidationValues.DECIMAL_MIN, inclusive = false)
    private BigDecimal price;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private int quantityStock;

    private BigDecimal discount;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private List<ImageEntity> images;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private EntityStatus status;

    public String getName() {
        return this.name.trim();
    }

    public String getSlug() {
        return CustomString.toSlug(this.name.trim());
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public Long getBrandId() {
        return brandId;
    }

    public String getDescription() {
        return description.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public int getQuantityStock() {
        return quantityStock;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public List<ImageEntity> getImages() {
        return images;
    }

    public EntityStatus getStatus() {
        return status;
    }
}
