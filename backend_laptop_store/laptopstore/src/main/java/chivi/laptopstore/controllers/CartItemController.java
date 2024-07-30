package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.communication.requests.CartItemRequest;
import chivi.laptopstore.communication.responses.SuccessResponse;
import chivi.laptopstore.helpers.AuthContext;
import chivi.laptopstore.mappers.CartItemMapper;
import chivi.laptopstore.models.Account;
import chivi.laptopstore.models.CartItem;
import chivi.laptopstore.services.CartItemService;
import chivi.laptopstore.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(RequestMaps.API_V1 + "/private/cart-item")
public class CartItemController {
    private final CartItemService cartItemService;
    private final ProductService productService;
    private final CartItemMapper mapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllCartItem() {
        Account account = AuthContext.getFromSecurityContext();
        var items = cartItemService.getAllCartItemByAccountId(account.getId())
                .stream()
                .map(mapper::toCartItemPayload)
                .toList();
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, items);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createCartItem(@RequestBody @Valid CartItemRequest request) {
        Account account = AuthContext.getFromSecurityContext();
        var product = productService.getInfoById(request.productId());

        productService.updateStock(product, product.getQuantityStock() - request.quantity());
        var cart = cartItemService.createOrUpdate(mapper.toCartItem(account.getId(), product, request))
                .stream()
                .map(mapper::toCartItemPayload)
                .toList();
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, cart);
    }

    @PatchMapping("{cartItemId}/plus")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SuccessResponse incrementQuantity(@PathVariable long cartItemId) {
        CartItem cartItem = cartItemService.getById(cartItemId);
        var product = cartItem.getProduct();
        int quantity = cartItem.getQuantity() + 1;
        int stock = product.getQuantityStock() - 1;

        productService.updateStock(product, stock);
        cartItemService.updateQuantity(cartItem, quantity);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS);
    }

    @PatchMapping("{cartItemId}/minus")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SuccessResponse decrementQuantity(@PathVariable long cartItemId) {
        CartItem cartItem = cartItemService.getById(cartItemId);
        var product = cartItem.getProduct();
        int quantity = cartItem.getQuantity() - 1;
        int stock = product.getQuantityStock() + 1;

        productService.updateStock(product, stock);
        cartItemService.updateQuantity(cartItem, quantity);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS);
    }

    @DeleteMapping("{cartItemId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteCartItem(@PathVariable long cartItemId) {
        Account account = AuthContext.getFromSecurityContext();
        var cartItem = cartItemService.getById(cartItemId);
        var product = cartItem.getProduct();
        int stock = cartItem.getQuantity() + product.getQuantityStock();

        productService.updateStock(product, stock);
        cartItemService.deleteById(cartItemId);

        var cart = cartItemService.getAllCartItemByAccountId(account.getId())
                .stream()
                .map(mapper::toCartItemPayload)
                .toList();
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS, cart);
    }

    @DeleteMapping()
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAllCartItem() {
        Account account = AuthContext.getFromSecurityContext();
        var items = cartItemService.getAllCartItemByAccountId(account.getId());

        productService.restoreFromCartItem(items);
        cartItemService.deleteAllByAccountId(account.getId());
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }
}
