package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.models.requests.LoginRequest;
import chivi.laptopstore.models.requests.RegisterRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping(RequestMaps.AUTH_PATHNAME + "login")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "register-admin")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse registerAdmin(@Valid @RequestBody RegisterRequest registerRequest) {
        return authenticationService.registerAdmin(registerRequest);
    }

    @PostMapping(RequestMaps.AUTH_PATHNAME + "register-customer")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse registerCustomer(@Valid @RequestBody RegisterRequest registerRequest) {
        return authenticationService.registerCustomer(registerRequest);
    }
}
