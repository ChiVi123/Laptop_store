package chivi.laptopstore.controllers;

import chivi.laptopstore.common.OrderStatus;
import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.communication.requests.ExecutePaymentRequest;
import chivi.laptopstore.communication.requests.MakePaymentRequest;
import chivi.laptopstore.communication.responses.SuccessResponse;
import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.helpers.AuthContext;
import chivi.laptopstore.mappers.OrderLineMapper;
import chivi.laptopstore.services.CartItemService;
import chivi.laptopstore.services.OrderService;
import chivi.laptopstore.services.ProductService;
import chivi.laptopstore.services.payment.PaymentServiceGetter;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(RequestMaps.API_V1 + "/private/orders")
public class OrderController {
    private final CartItemService cartItemService;
    private final OrderService orderService;
    private final ProductService productService;
    private final PaymentServiceGetter paymentServiceGetter;
    private final OrderLineMapper orderLineMapper;
//  sb-mn470631681810@personal.example.com

    @PostMapping("make-payment")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse makePayment(@RequestBody MakePaymentRequest request) throws Exception {
        var account = AuthContext.getFromSecurityContext();
        var cartItems = cartItemService.getAllCartItemByAccountId(account.getId());
        var paymentService = paymentServiceGetter.getService(request.paymentMethod());
        var createPaymentPayload = paymentService.createPayment(cartItems, request);

        if (createPaymentPayload == null) {
            throw new BaseException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Can't init payment");
        }

        var orderItems = cartItems.stream().map(orderLineMapper::toOrderItemFromCartItem).toList();
        orderService.create(createPaymentPayload.token(), orderItems, request);
        return new SuccessResponse("Payment init complete", createPaymentPayload.href());
    }

    @PatchMapping("execute-payment")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse executePayment(@RequestBody ExecutePaymentRequest request) throws PayPalRESTException {
        var paymentService = paymentServiceGetter.getService(request.paymentMethod());
        boolean isSuccess = paymentService.executePayment(request);

        if (isSuccess) {
            var account = AuthContext.getFromSecurityContext();
            var order = orderService.findByPaymentTokenAndStatus(request.token(), OrderStatus.PREPARING);
            orderService.setStatus(order, OrderStatus.PROCESSING);
            cartItemService.deleteAllByAccountId(account.getId());

            String payload = request.paymentId() != null ? request.paymentId() : "";
            return new SuccessResponse("Execute payment successful", payload);
        } else {
            throw new BaseException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Execute payment fail");
        }
    }

    @PatchMapping("/{orderId}/complete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse completeOrder(@PathVariable("orderId") Long orderId) {
        var order = orderService.findByIdAndStatus(orderId, OrderStatus.PROCESSING);
        orderService.setStatus(order, OrderStatus.COMPLETED);
        productService.updateAllQuantitySold(order.getItems());
        return new SuccessResponse("Order completed", orderId);
    }

    @PatchMapping("/{orderId}/cancel")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse cancelOrder(@PathVariable("orderId") Long orderId) {
        var order = orderService.findByIdAndInOrderStatus(orderId, List.of(OrderStatus.PREPARING, OrderStatus.PROCESSING));
        orderService.setStatus(order, OrderStatus.CANCELED);
        productService.restoreFromOrderItem(order.getItems());
        return new SuccessResponse("Order cancelled", orderId);
    }
}
