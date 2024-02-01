package chivi.laptopstore.events;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class OnResetPasswordEvent extends ApplicationEvent {
    private String email;

    public OnResetPasswordEvent(String email) {
        super(email);
        this.email = email;
    }
}
