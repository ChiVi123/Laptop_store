package chivi.laptopstore.events;

import chivi.laptopstore.models.entities.AccountEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class OnRegistrationEvent extends ApplicationEvent {
    private AccountEntity account;

    public OnRegistrationEvent(AccountEntity account) {
        super(account);
        this.account = account;
    }
}
