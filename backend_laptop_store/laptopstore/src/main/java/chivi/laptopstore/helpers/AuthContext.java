package chivi.laptopstore.helpers;

import chivi.laptopstore.models.Account;
import chivi.laptopstore.security.account.AccountDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthContext {
    public static Account getFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((AccountDetails) authentication.getPrincipal()).getAccount();
    }
}
