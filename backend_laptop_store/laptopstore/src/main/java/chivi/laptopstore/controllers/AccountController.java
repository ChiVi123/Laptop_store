package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.models.requests.AccountRequest;
import chivi.laptopstore.models.responses.ResponseModel;
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
    public ResponseModel findAllAccount() {
        return accountService.findAllAccount();
    }

    @PutMapping(RequestMaps.ACCOUNT_PATHNAME_PRIVATE + "edit")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel editAccount(
            @Valid @RequestBody AccountRequest accountRequest,
            HttpServletRequest httpServletRequest
    ) {
        String email = this.getEmailFromRequest(httpServletRequest);
        return accountService.editAccount(email, accountRequest);
    }

    @DeleteMapping(RequestMaps.ACCOUNT_PATHNAME_ADMIN + "delete/{accountId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseModel deleteAccount(@PathVariable Long accountId) {
        return accountService.deleteAccount(accountId);
    }

    private String getEmailFromRequest(HttpServletRequest request) {
        String token = jwtUtils.getTokenFromAuthorizationHeader(request);
        return jwtUtils.getSubjectFromToken(token);
    }
}
