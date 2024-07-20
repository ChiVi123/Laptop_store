package chivi.laptopstore.models;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = EntityNames.TABLE_ORDER_ITEM)
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ProductInfo product;

    @ManyToOne
    private Order order;

    private int quantity;

    public OrderItem(ProductInfo product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public BigDecimal getSubTotal() {
        return this.product.getPrice().multiply(new BigDecimal(this.quantity));
    }
}
