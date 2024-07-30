package chivi.laptopstore.communication.error;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
public class FieldErrorBodyResponse extends ErrorBodyResponse {
    private final List<Map<String, Object>> errors;

    public FieldErrorBodyResponse(String message, String path) {
        super(message, path);
        this.errors = new ArrayList<>();
    }

    public void addErrorItem(String field, String message) {
        this.errors.add(Map.of("field", field, "message", message));
    }
}
