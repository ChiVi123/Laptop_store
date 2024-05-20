package chivi.laptopstore.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "order_item")
@NoArgsConstructor
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductInfo product;

    private int quantity;

    public OrderItem(ProductInfo product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public BigDecimal getSubTotal() {
        return this.product.getPrice().multiply(new BigDecimal(this.quantity));
    }
}
