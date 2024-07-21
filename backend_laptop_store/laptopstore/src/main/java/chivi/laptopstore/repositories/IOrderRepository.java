package chivi.laptopstore.repositories;

import chivi.laptopstore.common.OrderStatus;
import chivi.laptopstore.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByIdAndStatus(Long id, OrderStatus orderStatus);

    Optional<Order> findByIdAndStatusIn(Long id, List<OrderStatus> orderStatus);

    Optional<Order> findOrderByPaymentTokenAndStatus(String paymentToken, OrderStatus orderStatus);
}
