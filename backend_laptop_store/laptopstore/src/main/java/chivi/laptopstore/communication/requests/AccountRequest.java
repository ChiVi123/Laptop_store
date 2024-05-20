package chivi.laptopstore.communication.requests;

import chivi.laptopstore.common.ValidationMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.Setter;

@Setter
public class AccountRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    private String username;

    @NotBlank(message = ValidationMessage.NOT_BLANK)
    private String fullName;

    public String getUsername() {
        return this.username.trim();
    }

    public String getFullName() {
        return this.fullName.trim();
    }
}
