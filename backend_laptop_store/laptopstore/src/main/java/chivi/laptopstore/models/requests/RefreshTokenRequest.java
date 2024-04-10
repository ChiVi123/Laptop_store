package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.ValidationMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    private String token;
}
