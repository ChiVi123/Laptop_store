package chivi.laptopstore.services.payment;

import chivi.laptopstore.communication.requests.ExecutePaymentRequest;
import chivi.laptopstore.communication.requests.MakePaymentRequest;
import chivi.laptopstore.models.CartItem;
import chivi.laptopstore.utils.PriceHandler;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RequiredArgsConstructor
@Service
public class PaypalService implements IPaymentMethodService {
    private final APIContext apiContext;

    @Override
    public String createPayment(List<CartItem> cartItems, MakePaymentRequest request) throws PayPalRESTException, IOException {
        BigDecimal subTotal = cartItems.stream().map(CartItem::getTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        double total = PriceHandler.exchange(subTotal);
        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(String.format(Locale.forLanguageTag("USD"), "%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription("Make payment for cart");

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(request.paymentMethod().toString());

        Payment payment = new Payment();
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        payment.setIntent("sale");

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setReturnUrl(request.successUrl());
        redirectUrls.setCancelUrl(request.cancelUrl());

        payment.setRedirectUrls(redirectUrls);

        var paymentCreated = payment.create(apiContext);
        String href = null;

        for (Links links : paymentCreated.getLinks()) {
            if (links.getRel().equals("approval_url")) {
                href = links.getHref();
            }
        }

        return href;
    }

    @Override
    public Boolean executePayment(ExecutePaymentRequest request) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(request.paymentId());

        PaymentExecution execution = new PaymentExecution();
        execution.setPayerId(request.payerId());

        var paymentExecuted = payment.execute(apiContext, execution);
        return paymentExecuted.getState().equals("approved");
    }
}
