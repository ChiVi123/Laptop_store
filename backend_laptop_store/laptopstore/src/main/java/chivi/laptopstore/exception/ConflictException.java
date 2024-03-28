package chivi.laptopstore.exception;

import chivi.laptopstore.common.ResponseMessage;
import org.springframework.http.HttpStatus;

public class ConflictException extends BaseException {
    public ConflictException(String object, Object key) {
        super(HttpStatus.CONFLICT.value(), String.format(ResponseMessage.EXISTS, object, key));
    }
}
