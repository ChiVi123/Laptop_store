package chivi.laptopstore.services.payment;

import chivi.laptopstore.common.PaymentType;

public record CreatePaymentPayload(
        String token,
        String href,
        PaymentType paymentType
) {
}
