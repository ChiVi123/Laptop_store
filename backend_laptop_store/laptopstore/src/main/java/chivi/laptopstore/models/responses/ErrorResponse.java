package chivi.laptopstore.models.responses;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class ErrorResponse {
    private final boolean success = false;
    private int code;
    private Map<String, Object> error;

    public ErrorResponse(int code) {
        this.code = code;
        this.error = new HashMap<>();
    }

    public void putItem(String key, Object value) {
        this.error.put(key, value);
    }

    public void putItem(Object value) {
        this.error.put("message", value);
    }
}
