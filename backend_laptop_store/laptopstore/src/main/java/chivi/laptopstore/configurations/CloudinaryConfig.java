package chivi.laptopstore.configurations;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
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

    public void deleteImage(List<String> publicIds) {
        Map<?, ?> options = ObjectUtils.asMap("type", "upload", "resource_type", "image");
        try {
            ApiResponse apiResponse = cloudinary().api().deleteResources(publicIds, options);
            log.info("Cloudinary delete resources: {}", apiResponse);
        } catch (IOException ioException) {
            log.error("Cloudinary delete io exception: {}", ioException.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}