package chivi.laptopstore.communication.requests;

import jakarta.validation.constraints.NotNull;

public record CartItemRequest(
        @NotNull(message = "Product id is required")
        long productId,
        @NotNull(message = "Quantity is required")
        int quantity
) {
}
