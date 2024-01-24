package chivi.laptopstore.models.exceptions;

import org.springframework.http.HttpStatus;

public class CustomBadRequestException extends BaseException {
    public CustomBadRequestException(String message) {
        super(HttpStatus.BAD_REQUEST.value(), message);
    }
}
