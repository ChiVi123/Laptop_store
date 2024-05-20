package chivi.laptopstore.services;

import chivi.laptopstore.common.EntityStatus;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.Account;
import chivi.laptopstore.models.Cart;
import chivi.laptopstore.models.OrderItem;
import chivi.laptopstore.repositories.ICartRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Stream;

@Slf4j
@Service
@AllArgsConstructor
public class CartService {
    private final ICartRepository repository;

    public Cart getByAccountEmail(String accountEmail) {
        return repository
                .findByAccount_EmailAndStatus(accountEmail, EntityStatus.ENABLED)
                .orElseThrow(() -> new NotFoundDataException("account", accountEmail));
    }

    public Cart createAndAddItem(Account account, OrderItem item) {
        Cart cart = new Cart(account, List.of(item), EntityStatus.ENABLED);
        return repository.save(cart);
    }

    public Cart addItemCartExist(Cart cart, OrderItem orderItem) {
        long productId = orderItem.getProduct().getId();
        Stream<OrderItem> itemList = cart.getItems().stream();
        Predicate<OrderItem> filter = item -> item.getProduct().getId().equals(productId);
        Optional<OrderItem> itemOptional = itemList.filter(filter).findFirst();

        if (itemOptional.isPresent()) {
            OrderItem resultItem = itemOptional.get();
            resultItem.setQuantity(resultItem.getQuantity() + orderItem.getQuantity());
        } else {
            cart.addItem(orderItem);
        }
        return repository.save(cart);
    }

    public Cart removeItem(Cart cart, OrderItem item) {
        cart.removeItem(item);
        return repository.save(cart);
    }

    public Cart editStatus(Cart cart, EntityStatus status) {
        cart.setStatus(status);
        return repository.save(cart);
    }
}
