package chivi.laptopstore.models.exceptions;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends BaseException {
    public UnauthorizedException(String message) {
        super(HttpStatus.UNAUTHORIZED.value(), message);
    }
}
