package chivi.laptopstore.communication.requests;

import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class DiscountRequest {
    @NotNull(message = ValidationMessage.NOT_NULL)
    @DecimalMin(value = ValidationValues.DECIMAL_MIN, inclusive = false)
    private BigDecimal discount;
}
