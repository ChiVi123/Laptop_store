package chivi.laptopstore.models.responses;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class ErrorItem {
    private String message = "";
    private LocalDateTime timestamp = LocalDateTime.now();

    public ErrorItem(String message) {
        this.message = message;
    }
}
