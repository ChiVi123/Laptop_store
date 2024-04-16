package chivi.laptopstore.communication.error;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ErrorBodyResponse {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    protected LocalDateTime timestamp;
    protected String message;
    protected String path;

    public ErrorBodyResponse(String message, String path) {
        this.message = message;
        this.path = path;
        this.timestamp = LocalDateTime.now();
    }
}
