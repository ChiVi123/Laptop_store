package chivi.laptopstore.services;

import chivi.laptopstore.common.AccountStatus;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.exception.CustomNotFoundException;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.requests.AccountRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.repositories.IAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountService {
    private final IAccountRepository repository;
    private final PasswordEncoder passwordEncoder;

    public SuccessResponse getAll() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, repository.findAll());
    }

    public AccountEntity getByEmail(String email) {
        return repository.findByEmail(email).orElseThrow(() -> new CustomNotFoundException("account", email));
    }

    public AccountEntity getByEmailAndStatus(String email, AccountStatus status) {
        String message = "Cannot find email: " + email + "with status " + status.name();
        return repository.findByEmailAndStatus(email, status).orElseThrow(() -> new BaseException(HttpStatus.NOT_FOUND.value(), message));
    }

    public void resetPassword(AccountEntity account, String newPassword) {
        String encode = passwordEncoder.encode(newPassword);
        account.setPassword(encode);
        repository.save(account);
    }

    public AccountEntity editInfo(AccountEntity account, AccountRequest request) {
        account.setUsername(request.getUsername());
        account.setFullName(request.getFullName());
        return repository.save(account);
    }

    public void delete(Long accountId) {
        AccountEntity account = this.getById(accountId);
        repository.delete(account);
    }

    private AccountEntity getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new CustomNotFoundException("account", id));
    }
}
