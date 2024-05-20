package chivi.laptopstore.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "order_tb")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Order extends EntityStandard {
    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "order_order_item",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id")
    )
    private List<OrderItem> items = new ArrayList<>();
}
