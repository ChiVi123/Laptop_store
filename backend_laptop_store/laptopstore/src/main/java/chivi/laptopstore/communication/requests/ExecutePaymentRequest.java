package chivi.laptopstore.communication.requests;

import chivi.laptopstore.common.PaymentType;
import jakarta.validation.constraints.NotNull;

public record ExecutePaymentRequest(
        @NotNull(message = "Order id is required")
        Long orderId,
        @NotNull(message = "Payment method is required")
        PaymentType paymentMethod,
        String paymentId,
        String payerId
) {
}
