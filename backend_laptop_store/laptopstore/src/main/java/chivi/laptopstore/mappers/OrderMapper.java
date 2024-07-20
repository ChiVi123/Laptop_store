package chivi.laptopstore.mappers;

import chivi.laptopstore.communication.requests.MakePaymentRequest;
import chivi.laptopstore.models.Address;
import chivi.laptopstore.models.Order;
import org.springframework.stereotype.Service;

@Service
public class OrderMapper {

    public Order toOrderFromMakePaymentRequest(MakePaymentRequest request) {
        return Order.builder()
                .paymentType(request.paymentMethod())
                .address(Address.builder().id(request.addressId()).build())
                .build();
    }
}
