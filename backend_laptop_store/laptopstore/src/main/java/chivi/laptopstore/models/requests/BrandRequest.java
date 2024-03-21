package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.EEntityStatus;
import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import chivi.laptopstore.models.entities.ImageEntity;
import chivi.laptopstore.utils.CustomString;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Setter;

@Setter
public class BrandRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(max = ValidationValues.STRING_MAX_LENGTH)
    private String name;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private ImageEntity logo;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private EEntityStatus status;

    public String getName() {
        return this.name.trim();
    }

    public String getSlug() {
        return CustomString.toSlug(this.name.trim());
    }

    public ImageEntity getLogo() {
        return this.logo;
    }

    public EEntityStatus getStatus() {
        return status;
    }
}
