package chivi.laptopstore.communication.requests;

import chivi.laptopstore.common.PaymentType;
import jakarta.validation.constraints.NotNull;

public record MakePaymentRequest(
        Long addressId,
        @NotNull(message = "Payment method is required")
        PaymentType paymentMethod,
        @NotNull(message = "Cancel url is required")
        String cancelUrl,
        @NotNull(message = "Success url is required")
        String successUrl
) {
}
