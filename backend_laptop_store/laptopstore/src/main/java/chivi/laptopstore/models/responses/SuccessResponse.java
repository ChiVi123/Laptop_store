package chivi.laptopstore.models.responses;

import lombok.Data;

@Data
public class SuccessResponse {
    private final boolean success = true;
    private String message;
    private Object result;

    public SuccessResponse(String message, Object result) {
        this.message = message;
        this.result = result;
    }

    public SuccessResponse(String message) {
        this.message = message;
        this.result = "";
    }
}
