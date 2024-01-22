package chivi.laptopstore.exceptionhandler;

import chivi.laptopstore.models.exceptions.BaseException;
import chivi.laptopstore.models.responses.ErrorItem;
import chivi.laptopstore.models.responses.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalHandler {
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<?> commonHandler(BaseException baseException) {
        ErrorItem errorItem = new ErrorItem(baseException.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(baseException.getCode(), List.of(errorItem));
        return ResponseEntity.status(baseException.getCode()).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse argumentNotValidHandler(MethodArgumentNotValidException exception) {
        List<ErrorItem> errorItemList = new ArrayList<>();
        exception.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String defaultMessage = error.getDefaultMessage();
            String message = String.join(" ", fieldName, defaultMessage);

            errorItemList.add(new ErrorItem(message));
        });
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), errorItemList);
    }
}
