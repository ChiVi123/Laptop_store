package chivi.laptopstore.exceptionhandler;

import chivi.laptopstore.models.exceptions.BaseException;
import chivi.laptopstore.models.responses.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalHandler {
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<?> commonHandler(BaseException baseException) {
        ErrorResponse errorResponse = new ErrorResponse(baseException.getCode());
        errorResponse.putItem(baseException.getMessage());
        log.error("Status: {}", baseException.getCode());
        return ResponseEntity.status(baseException.getCode()).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse argumentNotValidHandler(MethodArgumentNotValidException exception) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.value());

        exception.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String defaultMessage = error.getDefaultMessage();

            errorResponse.putItem(fieldName, defaultMessage);
        });

        return errorResponse;
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse authenticationHandler(AuthenticationException exception) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED.value());
        errorResponse.putItem(exception.getMessage());
        log.error("AuthenticationException");
        return errorResponse;
    }
}
