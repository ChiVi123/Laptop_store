package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotNull(message = ValidationMessage.NOT_NULL)
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Email(message = ValidationMessage.INVALID)
    private String email;

    @NotNull(message = ValidationMessage.NOT_NULL)
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(min = ValidationValues.STRING_MIN_LENGTH, max = ValidationValues.FULL_NAME_MAX_LENGTH)
    private String fullName;

    @NotNull(message = ValidationMessage.NOT_NULL)
    @Size(min = ValidationValues.STRING_MIN_LENGTH, max = ValidationValues.PASSWORD_MAX_LENGTH)
    private String password;
}
