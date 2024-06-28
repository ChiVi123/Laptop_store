package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.communication.requests.AccountRequest;
import chivi.laptopstore.communication.responses.SuccessResponse;
import chivi.laptopstore.helpers.AuthContext;
import chivi.laptopstore.models.Account;
import chivi.laptopstore.services.AccountService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping(RequestMaps.ACCOUNT_PATHNAME_ADMIN + "all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getAllAccount() {
        return accountService.getAll();
    }

    @GetMapping(RequestMaps.ACCOUNT_PATHNAME_PRIVATE + "profile")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getProfile() {
        Account account = AuthContext.getFromSecurityContext();
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, account);
    }

    @PutMapping(RequestMaps.ACCOUNT_PATHNAME_PRIVATE + "edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editAccount(@Valid @RequestBody AccountRequest accountRequest) {
        Account account = AuthContext.getFromSecurityContext();
        Account result = accountService.editInfo(account, accountRequest);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, result);
    }

    @DeleteMapping(RequestMaps.ACCOUNT_PATHNAME_ADMIN + "{id}/delete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAccount(@PathVariable Long id) {
        accountService.delete(id);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }
}
