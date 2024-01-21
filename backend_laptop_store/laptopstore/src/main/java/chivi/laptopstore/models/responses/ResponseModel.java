package chivi.laptopstore.models.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ResponseModel {
    private boolean success;
    private String message;
    private Object result;
}
