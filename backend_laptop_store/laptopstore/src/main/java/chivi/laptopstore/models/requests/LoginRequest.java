package chivi.laptopstore.models.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequest {
    @NotNull(message = "not null")
    @NotBlank(message = "not blank")
    @Email(message = "invalid")
    private String email;

    @NotNull(message = "not null")
    private String password;
}
