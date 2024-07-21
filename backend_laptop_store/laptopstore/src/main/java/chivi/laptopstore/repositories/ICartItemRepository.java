package chivi.laptopstore.repositories;

import chivi.laptopstore.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findAllCartItemByAccountId(Long accountId);
}
