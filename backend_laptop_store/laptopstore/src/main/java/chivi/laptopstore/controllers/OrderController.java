package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.communication.requests.OrderRequest;
import chivi.laptopstore.communication.responses.SuccessResponse;
import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.helpers.AuthContext;
import chivi.laptopstore.services.CartService;
import chivi.laptopstore.services.OrderService;
import chivi.laptopstore.services.payment.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping(RequestMaps.API_V1 + "/private/orders")
@RequiredArgsConstructor
public class OrderController {
    private final CartService cartService;
    private final OrderService orderService;
    private final PaypalService paypalService;

    @PostMapping("make-payment")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse addOrder(@RequestBody OrderRequest request) {
        var account = AuthContext.getFromSecurityContext();
        var cart = cartService.getByAccountEmail(account.getEmail());

        try {
            var payment = paypalService.createPayment(cart, request);
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return new SuccessResponse("Payment init complete", links.getHref());
                }
            }
        } catch (PayPalRESTException | IOException e) {
            throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY.value(), e.getMessage());
        }

        throw new BaseException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't init payment");
    }

    @GetMapping("execute-payment")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId
    ) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                return new SuccessResponse("Payment successful", payment.getId());
            }
        } catch (PayPalRESTException e) {
            log.error("Error occurred:: ", e);
        }
        throw new BaseException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Execute payment fail");
    }
}
