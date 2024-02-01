package chivi.laptopstore.utils;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class CustomMail {
    private final String fromMail;
    private final String toMail;
    private final String subject;
    private final String filename;
    private final Map<String, Object> model;

    public void send(JavaMailSender javaMailSender, Configuration configuration) throws IOException, TemplateException, MessagingException {
        String basePackagePath = "/templates";

        configuration.setClassForTemplateLoading(this.getClass(), basePackagePath);

        Template template = configuration.getTemplate(this.filename);
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(Objects.requireNonNull(template), this.model);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        String contentType = "text/html";

        log.info("From mail: {}", this.fromMail);
        log.info("To mail: {}", this.toMail);
        log.info("Subject mail: {}", this.subject);

        mimeMessage.setContent(html, contentType);
        mimeMessageHelper.setFrom(fromMail);
        mimeMessageHelper.setTo(this.toMail);
        mimeMessageHelper.setText(html, true);
        mimeMessageHelper.setSubject(this.subject);
        javaMailSender.send(mimeMessage);
    }
}
