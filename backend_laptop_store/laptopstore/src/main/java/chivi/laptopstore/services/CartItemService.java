package chivi.laptopstore.services;

import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.CartItem;
import chivi.laptopstore.repositories.ICartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CartItemService {
    private final ICartItemRepository repository;

    public List<CartItem> getAllCartItemByAccountId(long accountId) {
        return repository.findAllCartItemByAccountId(accountId);
    }

    public CartItem getById(long cartItemId) {
        return repository.findById(cartItemId)
                .orElseThrow(() -> new NotFoundDataException("cart item", cartItemId));
    }

    public CartItem create(CartItem cartItem) {
        long productId = cartItem.getProduct().getId();
        var allCartItems = repository.findAllCartItemByAccountId(cartItem.getAccount().getId());
        var itemOptional = allCartItems.stream().filter(item -> item.getProduct().getId().equals(productId)).findFirst();

        if (itemOptional.isPresent()) {
            var item = itemOptional.get();
            item.setQuantity(item.getQuantity() + cartItem.getQuantity());
            return repository.save(item);
        } else {
            return repository.save(cartItem);
        }
    }

    public void updateQuantity(CartItem cartItem, int quantity) {
        cartItem.setQuantity(quantity);
        repository.save(cartItem);
    }

    public void deleteById(long cartItemId) {
        repository.deleteById(cartItemId);
    }

    public void deleteAllByAccountId(Long accountId) {
        var allCartItems = repository.findAllCartItemByAccountId(accountId);
        repository.deleteAll(allCartItems);
    }
}
