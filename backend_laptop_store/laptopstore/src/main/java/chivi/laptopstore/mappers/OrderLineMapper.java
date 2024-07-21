package chivi.laptopstore.mappers;

import chivi.laptopstore.models.CartItem;
import chivi.laptopstore.models.OrderLine;
import org.springframework.stereotype.Service;

@Service
public class OrderLineMapper {
    public OrderLine toOrderItemFromCartItem(CartItem cartItem) {
        return new OrderLine(
                cartItem.getProduct(),
                cartItem.getQuantity()
        );
    }
}
