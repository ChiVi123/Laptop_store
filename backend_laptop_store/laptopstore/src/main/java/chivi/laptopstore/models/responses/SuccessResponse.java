package chivi.laptopstore.models.responses;

import lombok.Data;

@Data
public class SuccessResponse {
    private final boolean success = true;
    private String message;
    private Object data;

    public SuccessResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }

    public SuccessResponse(String message) {
        this.message = message;
        this.data = "";
    }
}
