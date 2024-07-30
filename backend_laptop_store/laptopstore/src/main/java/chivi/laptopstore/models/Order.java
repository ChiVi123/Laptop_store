package chivi.laptopstore.models;


import chivi.laptopstore.common.EntityNames;
import chivi.laptopstore.common.OrderStatus;
import chivi.laptopstore.common.PaymentType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = EntityNames.TABLE_ORDER)
public class Order extends EntityStandard {
    @Column(name = "payment_token")
    private String paymentToken;
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @ManyToOne(fetch = FetchType.LAZY)
    private Address address;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private List<OrderLine> items = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}

