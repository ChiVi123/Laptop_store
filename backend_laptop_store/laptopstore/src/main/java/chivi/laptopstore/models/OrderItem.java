package chivi.laptopstore.models;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = EntityNames.TABLE_ORDER_ITEM)
@NoArgsConstructor
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = EntityNames.JOIN_COLUMN_PRODUCT_ID, referencedColumnName = "id" )
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
