package chivi.laptopstore.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@Entity
@Table(name = "cart_item")
public class CartItem extends EntityStandard {
    private int quantity;
    @ManyToOne
    private ProductInfo product;
    @ManyToOne
    private Account account;

    public BigDecimal getTotal() {
        return product.getPrice().multiply(new BigDecimal(quantity));
    }
}
