package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.ValidationMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AccountRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    private String username;

    @NotBlank(message = ValidationMessage.NOT_BLANK)
    private String fullName;
}
