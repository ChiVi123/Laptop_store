package chivi.laptopstore.models;

import chivi.laptopstore.common.DeliveryAddressType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "address")
public class Address extends EntityStandard {
    @Column(name = "full_name")
    private String fullName;
    private String phone;

    private String province;
    @Column(name = "province_id")
    private int provinceId;

    private String district;
    @Column(name = "district_id")
    private int districtId;

    private String ward;
    @Column(name = "ward_id")
    private int wardId;

    private String street;

    @Column(name = "is_select_default")
    private boolean selectDefault;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_address_type")
    private DeliveryAddressType deliveryAddressType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "account_id")
    private Account account;

    //  property for response
    public String getLocation() {
        return String.format("%s, %s, %s, %s", street, ward, district, province);
    }

    //  property for response
    public boolean getIsChoose() {
        return !this.selectDefault;
    }
}
