package chivi.laptopstore.models;


import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = EntityNames.TABLE_ORDER)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Order extends EntityStandard {
    @OneToOne
    @JoinColumn(name = EntityNames.JOIN_COLUMN_ACCOUNT_ID)
    private Account account;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = EntityNames.TABLE_ORDER_ORDER_ITEM,
            joinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_ORDER_ID),
            inverseJoinColumns = @JoinColumn(name = EntityNames.JOIN_COLUMN_ITEM_ID)
    )
    private List<OrderItem> items = new ArrayList<>();
}
