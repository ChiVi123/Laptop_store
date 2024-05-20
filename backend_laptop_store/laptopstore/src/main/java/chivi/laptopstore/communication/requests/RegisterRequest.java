package chivi.laptopstore.communication.requests;

import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Setter;

@Setter
public class RegisterRequest {
    @NotNull(message = ValidationMessage.NOT_NULL)
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Email(message = ValidationMessage.INVALID)
    private String email;

    @NotNull(message = ValidationMessage.NOT_NULL)
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(min = ValidationValues.FULL_NAME_MIN_LENGTH, max = ValidationValues.FULL_NAME_MAX_LENGTH)
    private String fullName;

    @NotNull(message = ValidationMessage.NOT_NULL)
    @Size(min = ValidationValues.STRING_MIN_LENGTH, max = ValidationValues.PASSWORD_MAX_LENGTH)
    private String password;

    public String getEmail() {
        return this.email.trim();
    }

    public String getFullName() {
        return this.fullName.trim();
    }

    public String getPassword() {
        return this.password.trim();
    }
}
