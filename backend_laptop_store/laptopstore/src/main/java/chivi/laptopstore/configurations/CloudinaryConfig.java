package chivi.laptopstore.configurations;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class CloudinaryConfig {
    @Value("${app.cloudinary.name}")
    private String cloudName;
    @Value("${app.cloudinary.api.key}")
    private String apiKey;
    @Value("${app.cloudinary.api.secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        ));
    }

    public void deleteImage(String publicId) throws IOException {
        cloudinary().uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "image"));
    }
}
