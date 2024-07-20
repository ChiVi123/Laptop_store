package chivi.laptopstore.repositories;

import chivi.laptopstore.common.OrderStatus;
import chivi.laptopstore.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByAddress_Account_Id(Long id);

    Optional<Order> findByIdAndOrderStatus(Long id, OrderStatus orderStatus);

    Optional<Order> findByIdAndOrderStatusIn(Long id, List<OrderStatus> orderStatus);
}
