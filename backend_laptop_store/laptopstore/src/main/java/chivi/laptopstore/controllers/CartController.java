package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.communication.requests.OrderItemRequest;
import chivi.laptopstore.communication.responses.SuccessResponse;
import chivi.laptopstore.models.Account;
import chivi.laptopstore.models.Cart;
import chivi.laptopstore.models.OrderItem;
import chivi.laptopstore.models.ProductInfo;
import chivi.laptopstore.security.account.AccountDetails;
import chivi.laptopstore.services.CartService;
import chivi.laptopstore.services.OrderItemService;
import chivi.laptopstore.services.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class CartController {
    private final CartService cartService;
    private final OrderItemService orderItemService;
    private final ProductService productService;

    @GetMapping("private/cart")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getCartByAccountId() {
        Account account = this.getAccountFromSecurityContext();
        String email = account.getEmail();
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, cartService.getByAccountEmail(email));
    }

    @PostMapping("private/cart/add-item")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse saveCart(@RequestBody OrderItemRequest request) {
        Account account = this.getAccountFromSecurityContext();
        String email = account.getEmail();
        ProductInfo productInfo = productService.getInfoById(request.productId);
        OrderItem item = new OrderItem(productInfo, request.quantity);
        Cart result;

        try {
            Cart cart = cartService.getByAccountEmail(email);
            result = cartService.addItemCartExist(cart, item);
        } catch (Exception exception) {
            result = cartService.createAndAddItem(account, item);
        }

        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, result);
    }

    @PatchMapping("private/cart/{orderItemId}/plus")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse incrementQuantity(@PathVariable Long orderItemId) {
        OrderItem item = orderItemService.getById(orderItemId);
        int quantity = item.getQuantity() + 1;
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, orderItemService.changeQuantity(item, quantity));
    }

    @PatchMapping("private/cart/{orderItemId}/minus")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse decrementQuantity(@PathVariable Long orderItemId) {
        OrderItem item = orderItemService.getById(orderItemId);
        int quantity = item.getQuantity() - 1;
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, orderItemService.changeQuantity(item, quantity));
    }

    @DeleteMapping("private/cart/{orderItemId}/remove-item")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteItem(@PathVariable Long orderItemId) {
        Account account = this.getAccountFromSecurityContext();
        String email = account.getEmail();
        Cart cart = cartService.getByAccountEmail(email);
        OrderItem item = orderItemService.getById(orderItemId);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, cartService.removeItem(cart, item));
    }

    private Account getAccountFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((AccountDetails) authentication.getPrincipal()).getAccount();
    }
}
