package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.requests.AccountRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.security.jwt.JwtUtils;
import chivi.laptopstore.services.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final JwtUtils jwtUtils;

    @GetMapping(RequestMaps.ACCOUNT_PATHNAME_ADMIN + "find-all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllAccount() {
        return accountService.getAllAccount();
    }

    @PutMapping(RequestMaps.ACCOUNT_PATHNAME_PRIVATE + "edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editAccount(@Valid @RequestBody AccountRequest accountRequest, HttpServletRequest httpServletRequest) {
        String email = this.getEmailFromRequest(httpServletRequest);
        AccountEntity account = accountService.editAccount(email, accountRequest);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, account);

    }

    @DeleteMapping(RequestMaps.ACCOUNT_PATHNAME_ADMIN + "delete/{accountId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAccount(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

    private String getEmailFromRequest(HttpServletRequest request) {
        String token = jwtUtils.getTokenFromAuthorizationHeader(request);
        return jwtUtils.getSubjectFromToken(token);
    }
}
