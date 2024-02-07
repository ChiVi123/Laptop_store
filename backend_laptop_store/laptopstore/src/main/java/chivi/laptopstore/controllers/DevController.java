package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.entities.VerificationTokenEntity;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.services.AccountService;
import chivi.laptopstore.services.DevService;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(RequestMaps.API_V1_DEV)
@AllArgsConstructor
public class DevController {
    private final DevService devService;
    private final AccountService accountService;

    @GetMapping("send-email")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse sendOTPtoEmail(@RequestParam("email") String email) throws MessagingException, TemplateException, IOException {
        Map<String, Object> model = new HashMap<>();
        devService.sendEmail(email, model);
        return new SuccessResponse(email);
    }

    @PutMapping("update-verification-token")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse updateVerificationToken(@RequestParam("email") String email) {
        VerificationTokenEntity verificationToken = devService.findVerificationTokenByEmail(email);
        String token = UUID.randomUUID().toString();
        verificationToken.setToken(token);
        verificationToken.setNewExpired();

        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, devService.saveVerificationToken(verificationToken));
    }

    @PutMapping("account-reset-status/{email}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse resetStatusAccount(@PathVariable String email) {
        AccountEntity account = accountService.getByEmail(email);
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, devService.resetAccount(account));
    }

    @DeleteMapping("delete-all-brand")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAllBrand() {
        devService.deleteAllBrand();
        return new SuccessResponse(ResponseMessage.DELETE_ALL_SUCCESS);
    }

    @DeleteMapping("delete-all-category")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAllCategory() {
        devService.deleteAllCategory();
        return new SuccessResponse(ResponseMessage.DELETE_ALL_SUCCESS);
    }


    @DeleteMapping("delete-all-product")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAllProduct() {
        devService.deleteAllProduct();
        return new SuccessResponse(ResponseMessage.DELETE_ALL_SUCCESS);
    }
}
