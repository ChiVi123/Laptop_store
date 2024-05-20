package chivi.laptopstore.communication.responses;

import lombok.Data;

@Data
public class SuccessResponse {
    private String message;
    private Object payload;

    public SuccessResponse(String message, Object payload) {
        this.message = message;
        this.payload = payload;
    }

    public SuccessResponse(String message) {
        this.message = message;
        this.payload = "";
    }
}
