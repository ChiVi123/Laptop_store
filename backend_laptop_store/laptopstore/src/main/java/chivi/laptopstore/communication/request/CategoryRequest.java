package chivi.laptopstore.communication.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank(message = "Name not blank")
    private String name;
    @NotBlank(message = "URL not blank")
    private String url;
}
