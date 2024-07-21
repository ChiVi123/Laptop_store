package chivi.laptopstore.services.payment;

import chivi.laptopstore.communication.requests.ExecutePaymentRequest;
import chivi.laptopstore.communication.requests.MakePaymentRequest;
import chivi.laptopstore.models.CartItem;
import com.paypal.base.rest.PayPalRESTException;

import java.io.IOException;
import java.util.List;

public interface IPaymentMethodService {
    CreatePaymentPayload createPayment(List<CartItem> cartItems, MakePaymentRequest request) throws PayPalRESTException, IOException;

    Boolean executePayment(ExecutePaymentRequest request) throws PayPalRESTException;
}
