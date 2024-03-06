package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.EEntityStatus;
import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryRequest {
    private Long parentId;

    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(max = ValidationValues.STRING_MAX_LENGTH)
    private String name;

    @Size(max = ValidationValues.STRING_MAX_LENGTH)
    private String path;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private EEntityStatus status;
}
