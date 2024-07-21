package chivi.laptopstore.services.payment;

import chivi.laptopstore.communication.requests.ExecutePaymentRequest;
import chivi.laptopstore.communication.requests.MakePaymentRequest;
import chivi.laptopstore.models.CartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class CODService implements IPaymentMethodService {
    @Override
    public CreatePaymentPayload createPayment(List<CartItem> cartItems, MakePaymentRequest request) {
        String token = UUID.randomUUID().toString();
        return new CreatePaymentPayload(
                token,
                request.successUrl() + "?token=" + token,
                request.paymentMethod()
        );
    }

    @Override
    public Boolean executePayment(ExecutePaymentRequest request) {
        return true;
    }
}
