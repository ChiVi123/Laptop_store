package chivi.laptopstore.repositories;

import chivi.laptopstore.common.EntityStatus;
import chivi.laptopstore.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findAllByStatus(EntityStatus status);

    Optional<Cart> findByAccount_EmailAndStatus(String account_email, EntityStatus status);
}
