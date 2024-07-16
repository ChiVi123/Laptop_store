package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.communication.requests.AddressRequest;
import chivi.laptopstore.communication.responses.SuccessResponse;
import chivi.laptopstore.helpers.AuthContext;
import chivi.laptopstore.services.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(RequestMaps.API_V1 + "/private/address")
public class AddressController {
    private final AddressService addressService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getAllAddress() {
        var account = AuthContext.getFromSecurityContext();
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, addressService.getAllByAccountId(account.getId()));
    }

    @GetMapping("{address-id}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getAddressById(@PathVariable("address-id") Long addressId) {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, addressService.getAddressById(addressId));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createAddress(@RequestBody @Valid AddressRequest request) {
        if (request.selectDefault()) {
            addressService.setAddressNotDefault(request.accountId());
        }
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, addressService.create(request));
    }

    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SuccessResponse updateAddress(@RequestBody @Valid AddressRequest request) {
        if (request.selectDefault()) {
            addressService.setAddressNotDefault(request.accountId());
        }
        var address = addressService.getAddressById(request.id());
        addressService.update(address, request);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS);
    }

    @DeleteMapping("{address-id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SuccessResponse deleteAddress(@PathVariable("address-id") Long id) {
        addressService.deleteById(id);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }
}
