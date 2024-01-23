package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.exceptions.BaseException;
import chivi.laptopstore.models.requests.AccountRequest;
import chivi.laptopstore.models.responses.ResponseModel;
import chivi.laptopstore.repositories.entities.IAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountService {
    private final IAccountRepository accountRepository;

    public ResponseModel findAllAccount() {
        return new ResponseModel(true, "Success", accountRepository.findAll());
    }

    public ResponseModel editAccount(String email, AccountRequest accountRequest) {
        Optional<AccountEntity> optionalAccount = accountRepository.findByEmail(email);
        if (optionalAccount.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't find account");
        }

        AccountEntity account = optionalAccount.get();
        account.setUsername(accountRequest.getUsername());
        account.setFullName(accountRequest.getFullName());
        return new ResponseModel(true, "Success", accountRepository.save(account));
    }

    public ResponseModel deleteAccount(Long accountId) {
        Optional<AccountEntity> optionalAccount = accountRepository.findById(accountId);
        if (optionalAccount.isEmpty()) {
            throw new BaseException(HttpStatus.NOT_FOUND.value(), "Can't find account");
        }

        accountRepository.delete(optionalAccount.get());
        return new ResponseModel(true, "Success", "");
    }
}
