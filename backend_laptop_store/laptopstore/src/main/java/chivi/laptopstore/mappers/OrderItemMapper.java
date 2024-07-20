package chivi.laptopstore.mappers;

import chivi.laptopstore.models.CartItem;
import chivi.laptopstore.models.OrderItem;
import org.springframework.stereotype.Service;

@Service
public class OrderItemMapper {
    public OrderItem toOrderItemFromCartItem(CartItem cartItem) {
        return new OrderItem(
                cartItem.getProduct(),
                cartItem.getQuantity()
        );
    }
}
