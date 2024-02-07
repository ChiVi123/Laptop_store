package chivi.laptopstore.events;

import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.services.AuthenticationService;
import chivi.laptopstore.utils.CustomMail;
import chivi.laptopstore.utils.ElementHTML;
import freemarker.template.Configuration;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class RegistrationListener implements ApplicationListener<OnRegistrationEvent> {
    private final AuthenticationService authenticationService;
    private final JavaMailSender javaMailSender;
    private final Configuration configuration;
    @Value("${app.email.from}")
    private String fromMail;
    @Value("${app.domain.client}")
    private String host;

    @SneakyThrows
    @Override
    public void onApplicationEvent(OnRegistrationEvent event) {
        log.info("Start send mail: {}", Thread.currentThread().getName());

        String appURL = event.getAppURL();
        AccountEntity account = event.getAccount();
        String toMail = account.getEmail();
        String token = UUID.randomUUID().toString();

        authenticationService.saveVerificationToken(account, token);

        String url = this.createConfirmUrl(appURL, token);
        String buttonElement = this.createButtonLink(url);
        Map<String, Object> model = this.createTemplateModel(toMail, buttonElement);
        String subject = "Mã xác minh tài khoản Laptop Website";
        String fileName = "verify-account.ftl";
        CustomMail customMail = CustomMail
                .builder()
                .fromMail(fromMail)
                .toMail(toMail)
                .subject(subject)
                .filename(fileName)
                .model(model)
                .build();

        customMail.send(javaMailSender, configuration);

        log.info("Token: {}", token);
        log.info("End send mail: {}", Thread.currentThread().getName());
    }

    private Map<String, Object> createTemplateModel(String toMail, String buttonElement) {
        return Map.of(
                "email", toMail,
                "buttonLink", buttonElement
        );
    }

    private String createButtonLink(String url) {
        ElementHTML elementHTML = new ElementHTML();
        Map<String, Object> props = Map.of(
                "href", url,
                "class", "button"
        );
        return elementHTML.createElement("a", props, List.of("Xác thực email"));
    }

    private String createConfirmUrl(String appURL, String token) {
        return String.format("%1$s/%2$s?token=%3$s", host, appURL, token);
    }
}
