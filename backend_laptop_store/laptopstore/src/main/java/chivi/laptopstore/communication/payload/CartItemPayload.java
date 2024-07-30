package chivi.laptopstore.communication.payload;

import java.math.BigDecimal;

public record CartItemPayload(
        Long id,
        Long productId,
        Long accountId,
        String productName,
        String productSlug,
        String productThumbnail,
        BigDecimal productPrice,
        BigDecimal productDiscount,
        int productQuantityStock,
        int quantity,
        BigDecimal total

) {
}
