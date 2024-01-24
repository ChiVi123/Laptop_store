package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.exceptions.NotFoundException;
import chivi.laptopstore.models.requests.AccountRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.repositories.entities.IAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountService {
    private final IAccountRepository accountRepository;

    public SuccessResponse findAllAccount() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, accountRepository.findAll());
    }

    public SuccessResponse editAccount(String email, AccountRequest accountRequest) {
        AccountEntity account = this.handleFindAccountByEmail(email);
        account.setUsername(accountRequest.getUsername());
        account.setFullName(accountRequest.getFullName());
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, accountRepository.save(account));
    }

    public SuccessResponse deleteAccount(Long accountId) {
        AccountEntity account = this.handleFindAccountById(accountId);
        accountRepository.delete(account);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

    private AccountEntity handleFindAccountById(Long id) {
        return accountRepository.findById(id).orElseThrow(() -> new NotFoundException("account", id));
    }

    private AccountEntity handleFindAccountByEmail(String email) {
        return accountRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("account", email));
    }
}
