package chivi.laptopstore.exception.handler;

import chivi.laptopstore.common.CodeError;
import chivi.laptopstore.communication.error.ErrorBodyResponse;
import chivi.laptopstore.communication.error.FamilyErrorBodyResponse;
import chivi.laptopstore.communication.error.FieldErrorBodyResponse;
import chivi.laptopstore.communication.error.NameErrorBodyResponse;
import chivi.laptopstore.exception.BaseException;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;

import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public NameErrorBodyResponse handleInternalError(Exception exception, ServletWebRequest request) {
        String className = exception.getClass().getName();
        String message = exception.getMessage();
        String requestUri = request.getRequest().getRequestURI();
        return new NameErrorBodyResponse(className, message, requestUri);
    }

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorBodyResponse> handleBaseException(BaseException exception, ServletWebRequest request) {
        int codeStatus = exception.getCode();
        String message = exception.getMessage();
        String requestUri = request.getRequest().getRequestURI();
        ErrorBodyResponse body = new ErrorBodyResponse(message, requestUri);
        return ResponseEntity.status(codeStatus).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public FieldErrorBodyResponse handleArgumentNotValid(MethodArgumentNotValidException exception, ServletWebRequest request) {
        String message = exception.getMessage();
        String requestUri = request.getRequest().getRequestURI();
        FieldErrorBodyResponse bodyResponse = new FieldErrorBodyResponse(message, requestUri);

        exception.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String defaultMessage = error.getDefaultMessage();
            bodyResponse.addErrorItem(fieldName, defaultMessage);
        });
        return bodyResponse;
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public FamilyErrorBodyResponse handleExpiredJwt(ExpiredJwtException exception, ServletWebRequest request) {
        String message = exception.getMessage();
        String requestUri = request.getRequest().getRequestURI();
        return new FamilyErrorBodyResponse(CodeError.TOKEN_EXPIRED_ERROR, message, requestUri);
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public NameErrorBodyResponse handleAuthentication(AuthenticationException exception, ServletWebRequest request) {
        String className = exception.getClass().getName();
        String message = exception.getMessage();
        String requestUri = request.getRequest().getRequestURI();
        return new NameErrorBodyResponse(className, message, requestUri);
    }

    @ExceptionHandler(InsufficientAuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleInsufficientAuthentication(InsufficientAuthenticationException exception, ServletWebRequest request) {
        String requestUri = request.getRequest().getRequestURI();
        return Map.of("description", "Credentials are missing.", "message", exception.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public FamilyErrorBodyResponse handleBadCredentials(BadCredentialsException exception, ServletWebRequest request) {
        String message = exception.getMessage();
        String requestUri = request.getRequest().getRequestURI();
        return new FamilyErrorBodyResponse(CodeError.USERNAME_OR_PASSWORD_INCORRECT_ERROR, message, requestUri);
    }
}
