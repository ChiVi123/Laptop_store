package chivi.laptopstore.services;

import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.OrderItem;
import chivi.laptopstore.repositories.IOrderItemRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class OrderItemService {
    private final IOrderItemRepository repository;

    public OrderItem getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundDataException("order item", id));
    }

    public OrderItem changeQuantity(OrderItem item, int quantity) {
        item.setQuantity(quantity);
        return repository.save(item);
    }
}
