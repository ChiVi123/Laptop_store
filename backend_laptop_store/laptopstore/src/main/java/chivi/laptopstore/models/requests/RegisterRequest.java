package chivi.laptopstore.models.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotNull(message = "not null")
    @NotBlank(message = "not blank")
    @Email(message = "invalid")
    private String email;

    @NotNull(message = "not null")
    @NotBlank(message = "not blank")
    @Size(min = 8, message = "is equal or greater than 8")
    @Size(max = 20, message = "is equal or less than 20")
    private String fullName;

    @NotNull(message = "not null")
    @Size(min = 8, message = "is equal or greater than 8")
    @Size(max = 32, message = "is equal or less than 32")
    private String password;
}
