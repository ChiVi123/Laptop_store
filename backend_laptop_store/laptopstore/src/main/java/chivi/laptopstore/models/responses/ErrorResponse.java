package chivi.laptopstore.models.responses;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class ErrorResponse {
    private String message;
    private List<Map<String, Object>> errors;

    public ErrorResponse(String message) {
        this.message = message;
        this.errors = new ArrayList<>();
    }

    public void addFieldItem(String field, String message) {
        this.errors.add(Map.of("field", field, "message", message));
    }
}
