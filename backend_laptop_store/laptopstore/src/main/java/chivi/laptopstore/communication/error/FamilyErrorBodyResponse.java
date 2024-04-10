package chivi.laptopstore.communication.error;

import lombok.Getter;

@Getter
public class FamilyErrorBodyResponse extends ErrorBodyResponse {
    private final String codeError;

    public FamilyErrorBodyResponse(String codeError, String message, String path) {
        super(message, path);
        this.codeError = codeError;
    }
}
