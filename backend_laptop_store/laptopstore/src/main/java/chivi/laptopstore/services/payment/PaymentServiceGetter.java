package chivi.laptopstore.services.payment;

import chivi.laptopstore.common.PaymentType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PaymentServiceGetter {
    private final ApplicationContext applicationContext;

    public IPaymentMethodService getService(PaymentType paymentType) {
//      paymentType is enum => no need default
        return switch (paymentType) {
            case PAYPAL -> applicationContext.getBean(PaypalService.class);
            case COD -> applicationContext.getBean(CODService.class);
        };
    }
}
