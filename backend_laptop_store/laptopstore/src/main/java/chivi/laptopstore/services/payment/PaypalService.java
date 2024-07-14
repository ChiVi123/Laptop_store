package chivi.laptopstore.services.payment;

import chivi.laptopstore.communication.requests.OrderRequest;
import chivi.laptopstore.models.Cart;
import chivi.laptopstore.utils.PriceHandler;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RequiredArgsConstructor
@Service
public class PaypalService {
    private final APIContext apiContext;

    public Payment createPayment(Cart cart, OrderRequest request) throws PayPalRESTException, IOException {
        double total = PriceHandler.exchange(cart.getSubTotal());
        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(String.format(Locale.forLanguageTag("USD"), "%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription("Thanh toan hoa don cho gio hang: " + cart.getId());

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(request.paymentMethod());

        Payment payment = new Payment();
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        payment.setIntent("sale");

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setReturnUrl(request.successUrl());
        redirectUrls.setCancelUrl(request.cancelUrl());

        payment.setRedirectUrls(redirectUrls);
        return payment.create(apiContext);
    }

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution execution = new PaymentExecution();
        execution.setPayerId(payerId);

        return payment.execute(apiContext, execution);
    }
}
