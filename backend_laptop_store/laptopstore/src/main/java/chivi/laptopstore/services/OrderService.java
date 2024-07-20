package chivi.laptopstore.services;

import chivi.laptopstore.common.OrderStatus;
import chivi.laptopstore.communication.requests.MakePaymentRequest;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.mappers.OrderMapper;
import chivi.laptopstore.models.Order;
import chivi.laptopstore.models.OrderItem;
import chivi.laptopstore.repositories.IOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderService {
    private final IOrderRepository repository;
    private final OrderMapper orderMapper;

    public Order findById(Long orderId) {
        return repository.findById(orderId).orElseThrow(() -> new NotFoundDataException("order", orderId));
    }

    public Order findByIdAndInOrderStatus(Long orderId, List<OrderStatus> statuses) {
        return repository.findByIdAndOrderStatusIn(orderId, statuses)
                .orElseThrow(() -> new NotFoundDataException("order not canceled or completed", orderId));
    }

    public Order findByIdAndStatus(Long orderId, OrderStatus orderStatus) {
        return repository.findByIdAndOrderStatus(orderId, orderStatus)
                .orElseThrow(() -> new NotFoundDataException("order", orderId));
    }

    public void create(List<OrderItem> orderItems, MakePaymentRequest request) {
        BigDecimal amount = orderItems.stream().map(OrderItem::getSubTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        var order = orderMapper.toOrderFromMakePaymentRequest(request);
        order.setAmount(amount);
        order.setItems(orderItems);
        order.setOrderStatus(OrderStatus.PREPARING);
        repository.save(order);
    }

    public void setStatus(Order order, OrderStatus orderStatus) {
        order.setOrderStatus(orderStatus);
        repository.save(order);
    }
}
