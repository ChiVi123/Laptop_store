package chivi.laptopstore.events;

import chivi.laptopstore.models.entities.Account;
import chivi.laptopstore.services.AccountService;
import chivi.laptopstore.utils.CustomMail;
import freemarker.template.Configuration;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Map;
import java.util.Random;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResetPasswordListener implements ApplicationListener<OnResetPasswordEvent> {
    private final AccountService accountService;
    private final JavaMailSender javaMailSender;
    private final Configuration configuration;
    private final Random random = new SecureRandom();
    @Value("${app.email.from}")
    private String fromMail;

    @SneakyThrows
    @Override
    public void onApplicationEvent(OnResetPasswordEvent event) {
        log.info("Start send mail: {}", Thread.currentThread().getName());

        int lengthPassword = 20;
        String toMail = event.getEmail();
        String newPassword = this.generatePassword(lengthPassword);
        Map<String, Object> model = this.createModel(toMail, newPassword);
        Account account = accountService.getByEmail(toMail);

        accountService.resetPassword(account, newPassword);

        String subject = "Thiết lập lại mật khẩu Laptop Website";
        String fileName = "reset-password.ftl";
        CustomMail customMail = CustomMail
                .builder()
                .fromMail(fromMail)
                .toMail(toMail)
                .subject(subject)
                .filename(fileName)
                .model(model)
                .build();

        customMail.send(javaMailSender, configuration);

        log.info("New password: {}", newPassword);
        log.info("End send mail: {}", Thread.currentThread().getName());
    }

    private String generatePassword(int length) {
        String alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder generate = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            generate.append(alphabet.charAt(random.nextInt(alphabet.length())));
        }
        return new String(generate);
    }

    private Map<String, Object> createModel(String email, String password) {
        return Map.of(
                "email", email,
                "password", password
        );
    }
}
