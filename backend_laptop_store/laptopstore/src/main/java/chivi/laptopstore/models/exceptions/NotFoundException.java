package chivi.laptopstore.models.exceptions;

import chivi.laptopstore.common.ResponseMessage;
import org.springframework.http.HttpStatus;

public class NotFoundException extends BaseException {
    public NotFoundException(String object, Object key) {
        super(HttpStatus.NOT_FOUND.value(), String.format(ResponseMessage.CAN_NOT_FOUND, object, key));
    }
}
