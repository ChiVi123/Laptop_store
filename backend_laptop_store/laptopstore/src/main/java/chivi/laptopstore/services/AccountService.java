package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.models.requests.AccountRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.repositories.entities.IAccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountService {
    private final IAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public SuccessResponse getAllAccount() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, accountRepository.findAll());
    }

    public AccountEntity getByEmail(String email) {
        return accountRepository.findByEmail(email).orElseThrow(() -> new CustomNotFoundException("account", email));
    }

    public void resetPassword(AccountEntity account, String newPassword) {
        String encode = passwordEncoder.encode(newPassword);
        account.setPassword(encode);
        accountRepository.save(account);
    }

    public AccountEntity editAccount(String email, AccountRequest accountRequest) {
        AccountEntity account = this.getByEmail(email);
        account.setUsername(accountRequest.getUsername());
        account.setFullName(accountRequest.getFullName());
        return accountRepository.save(account);
    }

    public void deleteAccount(Long accountId) {
        AccountEntity account = this.getById(accountId);
        accountRepository.delete(account);
    }

    private AccountEntity getById(Long id) {
        return accountRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("account", id));
    }
}
