package chivi.laptopstore.services;

import chivi.laptopstore.common.OrderStatus;
import chivi.laptopstore.communication.requests.MakePaymentRequest;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.mappers.OrderMapper;
import chivi.laptopstore.models.Order;
import chivi.laptopstore.models.OrderLine;
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
        return repository.findByIdAndStatusIn(orderId, statuses)
                .orElseThrow(() -> new NotFoundDataException("order", orderId));
    }

    public Order findByIdAndStatus(Long orderId, OrderStatus orderStatus) {
        return repository.findByIdAndStatus(orderId, orderStatus)
                .orElseThrow(() -> new NotFoundDataException("order", orderId));
    }

    public Order findByPaymentTokenAndStatus(String token, OrderStatus orderStatus) {
        return repository.findOrderByPaymentTokenAndStatus(token, orderStatus)
                .orElseThrow(() -> new NotFoundDataException("order", token));
    }

    public Order create(String token, List<OrderLine> orderLines, MakePaymentRequest request) {
        BigDecimal amount = orderLines.stream().map(OrderLine::getSubTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        var order = orderMapper.toOrderFromMakePaymentRequest(request);
        order.setPaymentToken(token);
        order.setAmount(amount);
        order.setItems(orderLines);
        order.setStatus(OrderStatus.PREPARING);

        orderLines.forEach(line -> {
            line.setOrder(order);
        });
        return repository.save(order);
    }

    public void setStatus(Order order, OrderStatus orderStatus) {
        order.setStatus(orderStatus);
        repository.save(order);
    }
}
