package chivi.laptopstore.communication.requests;

import jakarta.validation.constraints.NotNull;

public record OrderRequest(
        @NotNull(message = "Payment method is required")
        String paymentMethod,
        @NotNull(message = "Cancel url is required")
        String cancelUrl,
        @NotNull(message = "Success url is required")
        String successUrl
) {
}
