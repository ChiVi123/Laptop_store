package chivi.laptopstore.mappers;

import chivi.laptopstore.communication.payload.AccountPayload;
import chivi.laptopstore.models.Account;
import org.springframework.stereotype.Service;

@Service
public class AccountMapper {
    public AccountPayload toPayloadFromAccount(Account account) {
        return new AccountPayload(
                account.getId(),
                account.getUsername(),
                account.getFullName(),
                account.getEmail(),
                account.getPhone(),
                account.getReviewCount(),
                account.getLikeCount()
        );
    }
}
