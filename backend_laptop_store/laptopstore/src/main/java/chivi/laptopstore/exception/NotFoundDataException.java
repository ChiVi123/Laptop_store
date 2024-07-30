package chivi.laptopstore.exception;

import chivi.laptopstore.common.ResponseMessage;
import org.springframework.http.HttpStatus;

public class NotFoundDataException extends BaseException {
    public NotFoundDataException(String object, Object key) {
        super(HttpStatus.NOT_FOUND.value(), String.format(ResponseMessage.CAN_NOT_FOUND, object, key));
    }
}
