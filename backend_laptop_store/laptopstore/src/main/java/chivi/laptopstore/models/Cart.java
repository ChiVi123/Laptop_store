package chivi.laptopstore.models;


import chivi.laptopstore.common.EntityNames;
import chivi.laptopstore.common.EntityStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = EntityNames.TABLE_CART)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Cart extends EntityStandard {
    @ManyToOne
    private Account account;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = EntityNames.TABLE_CART_ITEM,
            joinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_CART_ID),
            inverseJoinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_ITEM_ID)
    )
    private List<OrderItem> items = new ArrayList<>();

    private Instant expiration;

    private EntityStatus status;

    public BigDecimal getSubTotal() {
        return this.items.stream().map(OrderItem::getSubTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void addItem(OrderItem item) {
        this.items.add(item);
    }

    public void removeItem(OrderItem item) {
        this.items.remove(item);
    }

    public void removeAllItem() {
        this.items.clear();
    }
}
