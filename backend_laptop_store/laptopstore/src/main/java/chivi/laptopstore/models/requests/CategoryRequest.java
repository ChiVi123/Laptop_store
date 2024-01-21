package chivi.laptopstore.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank(message = "Name not blank")
    private String name;
    private String url;
}
