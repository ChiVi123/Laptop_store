package chivi.laptopstore.services.payment;

import chivi.laptopstore.communication.requests.ExecutePaymentRequest;
import chivi.laptopstore.communication.requests.MakePaymentRequest;
import chivi.laptopstore.models.CartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CODService implements IPaymentMethodService {
    @Override
    public String createPayment(List<CartItem> cartItems, MakePaymentRequest request) {
        return "";
    }

    @Override
    public Boolean executePayment(ExecutePaymentRequest request) {
        return null;
    }
}
