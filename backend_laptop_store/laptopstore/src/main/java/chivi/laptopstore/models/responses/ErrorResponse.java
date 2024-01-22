package chivi.laptopstore.models.responses;

import lombok.Data;

import java.util.List;

@Data
public class ErrorResponse {
    private final boolean success = false;
    private int code;
    private List<ErrorItem> errors;

    public ErrorResponse(int code, List<ErrorItem> errors) {
        this.code = code;
        this.errors = errors;
    }
}
