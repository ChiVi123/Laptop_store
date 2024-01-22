package chivi.laptopstore.models.requests;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class DiscountRequest {
    @NotNull(message = "not null")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal discount;
}
