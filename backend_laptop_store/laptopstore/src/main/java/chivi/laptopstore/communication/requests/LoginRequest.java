package chivi.laptopstore.communication.requests;

import chivi.laptopstore.common.ValidationMessage;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequest {
    @NotNull(message = ValidationMessage.NOT_NULL)
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Email(message = ValidationMessage.INVALID)
    private String email;

    @NotNull(message = ValidationMessage.NOT_NULL)
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    private String password;
}
