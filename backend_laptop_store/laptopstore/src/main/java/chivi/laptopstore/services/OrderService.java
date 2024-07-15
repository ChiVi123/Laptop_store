package chivi.laptopstore.services;

import chivi.laptopstore.communication.requests.OrderRequest;
import chivi.laptopstore.models.OrderItem;
import chivi.laptopstore.repositories.IOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderService {
    private final IOrderRepository orderRepository;

    public void makePaymentPaypal(OrderRequest request, List<OrderItem> items) {

    }
}
