package chivi.laptopstore.services;

import chivi.laptopstore.common.EAccountStatus;
import chivi.laptopstore.models.entities.AccountEntity;
import chivi.laptopstore.models.entities.VerificationTokenEntity;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.repositories.entities.*;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class DevService {
    private final JavaMailSender javaMailSender;
    private final Configuration configuration;
    private final IAccountRepository accountRepository;
    private final IVerificationTokenRepository verificationTokenRepository;
    private final IBrandRepository brandRepository;
    private final ICategoryRepository categoryRepository;
    private final IProductRepository productRepository;

    public void sendEmail(String toMail, Map<String, Object> model) throws MessagingException, IOException, TemplateException {
        log.info("Start send mail: {}", Thread.currentThread().getName());

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        Template template = null;
        String verificationCode = UUID.randomUUID().toString();

        configuration.setClassForTemplateLoading(this.getClass(), "/templates");
        template = configuration.getTemplate("verify-account.ftl");
        model.put("email", String.format("<a href=\"mailto:%1$s\">%1$s</a>", toMail));
        model.put("verificationCode", verificationCode);

        String html = FreeMarkerTemplateUtils.processTemplateIntoString(Objects.requireNonNull(template), model);

        mimeMessage.setContent(html, "text/html");
        mimeMessageHelper.setFrom("laptopstore290124@gmail.com");
        mimeMessageHelper.setTo(toMail);
        mimeMessageHelper.setText(html, true);
        mimeMessageHelper.setSubject("Mã xác minh tài khoản Laptop Website");
        javaMailSender.send(mimeMessage);

        log.info("End send mail: {}", Thread.currentThread().getName());
    }

    public AccountEntity resetAccount(AccountEntity account) {
        account.setStatus(EAccountStatus.NOT_VERIFIED);
        return accountRepository.save(account);
    }

    public VerificationTokenEntity findVerificationTokenByEmail(String email) {
        AccountEntity account = accountRepository.findByEmail(email).orElseThrow(() -> new CustomNotFoundException("Account", email));
        Long accountId = account.getId();
        return verificationTokenRepository.findByAccountId(accountId).orElseThrow(() -> new CustomNotFoundException("Verification token", accountId));
    }

    public VerificationTokenEntity saveVerificationToken(VerificationTokenEntity verificationToken) {
        return verificationTokenRepository.save(verificationToken);
    }

    public void deleteAllBrand() {
        brandRepository.deleteAll();
    }

    public void deleteAllCategory() {
        categoryRepository.deleteAll();
    }

    public void deleteAllProduct() {
        productRepository.deleteAll();
    }
}
