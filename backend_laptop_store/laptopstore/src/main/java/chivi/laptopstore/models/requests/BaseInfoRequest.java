package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BaseInfoRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(max = ValidationValues.STRING_MAX_LENGTH)
    private String name;
    @Size(max = ValidationValues.STRING_MAX_LENGTH)
    private String url;
}
