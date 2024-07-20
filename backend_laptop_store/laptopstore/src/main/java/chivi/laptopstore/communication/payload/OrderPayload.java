package chivi.laptopstore.communication.payload;

import chivi.laptopstore.common.DeliveryAddressType;
import chivi.laptopstore.models.OrderItem;

import java.math.BigDecimal;
import java.util.List;

public record OrderPayload(
        Long id,
        Long accountId,
        String accountUsername,
        String accountFullName,
        BigDecimal amount,
        String shippingUsername,
        String shippingFullName,
        String shippingAddress,
        DeliveryAddressType shippingDeliveryAddressType,
        List<OrderItem> items
) {
}
