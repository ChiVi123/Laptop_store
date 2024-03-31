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
    private List<Long> categoryIds;

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
    private EntityStatus status;

    public String getName() {
        return this.name.trim();
    }

    public String getSlug() {
        return CustomString.toSlug(this.name.trim());
    }

    public List<Long> getCategoryIds() {
        return this.categoryIds;
    }

    public String getDescription() {
        return this.description.trim();
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public int getQuantityStock() {
        return this.quantityStock;
    }

    public BigDecimal getDiscount() {
        return this.discount;
    }

    public List<ImageEntity> getImages() {
        return this.images;
    }

    public EntityStatus getStatus() {
        return this.status;
    }
}
