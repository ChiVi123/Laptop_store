package chivi.laptopstore.communication.requests;

import chivi.laptopstore.common.EntityStatus;
import chivi.laptopstore.common.ValidationMessage;
import chivi.laptopstore.common.ValidationValues;
import chivi.laptopstore.utils.CustomString;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Setter;

@Setter
public class CategoryRequest {
    private Long parentId;

    @NotBlank(message = ValidationMessage.NOT_BLANK)
    @Size(max = ValidationValues.STRING_MAX_LENGTH)
    private String name;

    @Size(max = ValidationValues.STRING_MAX_LENGTH)
    private String path;

    @NotNull(message = ValidationMessage.NOT_NULL)
    private EntityStatus status;

    public Long getParentId() {
        return this.parentId;
    }

    public String getName() {
        return this.name.trim();
    }

    public String getPath() {
        return this.path == null || this.path.equals("") ? CustomString.toSlug(this.name.trim()) : this.path.trim();
    }

    public EntityStatus getStatus() {
        return this.status;
    }
}
