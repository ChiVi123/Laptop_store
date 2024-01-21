package chivi.laptopstore.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BaseInfoRequest {
    @NotBlank(message = "Name is not blank")
    private String name;
    private String url;
}
