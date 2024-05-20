package chivi.laptopstore.events;

import chivi.laptopstore.models.Account;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class OnRegistrationEvent extends ApplicationEvent {
    private Account account;
    private String appURL;

    public OnRegistrationEvent(Account account, String appURL) {
        super(account);
        this.account = account;
        this.appURL = appURL;
    }
}
