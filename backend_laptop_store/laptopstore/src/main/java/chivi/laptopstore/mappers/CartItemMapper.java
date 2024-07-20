package chivi.laptopstore.mappers;

import chivi.laptopstore.communication.payload.CartItemPayload;
import chivi.laptopstore.communication.requests.CartItemRequest;
import chivi.laptopstore.models.Account;
import chivi.laptopstore.models.CartItem;
import chivi.laptopstore.models.ProductInfo;
import org.springframework.stereotype.Service;

@Service
public class CartItemMapper {
    public CartItemPayload toCartItemPayload(CartItem cartItem) {
        var product = cartItem.getProduct();
        return new CartItemPayload(
                cartItem.getId(),
                product.getId(),
                cartItem.getAccount().getId(),
                product.getName(),
                product.getSlug(),
                product.getThumbnailUrl(),
                product.getPrice(),
                product.getDiscount(),
                product.getQuantityStock(),
                cartItem.getQuantity(),
                cartItem.getTotal()
        );
    }

    public CartItem toCartItem(Long accountId, CartItemRequest request) {
        return CartItem.builder()
                .quantity(request.quantity())
                .product(ProductInfo.builder().id(request.productId()).build())
                .account(Account.builder().id(accountId).build())
                .build();
    }
}
