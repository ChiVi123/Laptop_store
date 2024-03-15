package chivi.laptopstore.models.requests;

import chivi.laptopstore.common.EEntityStatus;
import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.entities.ImageEntity;
import chivi.laptopstore.utils.CustomString;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BrandRequest {
    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(max = ValidationValues.STRING_MAX_LENGTH)
    private String name;

    private ImageEntity logo;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private EEntityStatus status;

    public BrandEntity getEntity() {
        String slug = CustomString.toSlug(this.name);
        return new BrandEntity(this.name, slug, this.logo, this.status);
    }
}
