package chivi.laptopstore.communication.error;

import lombok.Getter;

@Getter
public class NameErrorBodyResponse extends ErrorBodyResponse {
    private final String classException;

    public NameErrorBodyResponse(String classException, String message, String path) {
        super(message, path);
        this.classException = classException;
    }
}
