package chivi.laptopstore.configurations;

import chivi.laptopstore.common.AccountRole;
import chivi.laptopstore.security.jwt.JwtAuthenticationEntryPoint;
import chivi.laptopstore.security.jwt.JwtFilter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final String[] ALLOWED_LIST_URL = {
            "/api/v1/auth/**",
            "/api/v1/dev/**",
            //Paypal
            "/api/v1/checkout/*/success",
            "/api/v1/checkout/*/cancel"
    };
    private final String ALLOWED_GET_URL = "/api/v1/public/**";

    @Value("${app.allowed.origins}")
    private String[] allowedOrigins;

    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        String adminRoute = "/api/v1/admin/**";
        String privateRoute = "/api/v1/private/**";

        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize.requestMatchers(this.ALLOWED_LIST_URL).permitAll())
                .authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.GET, this.ALLOWED_GET_URL).permitAll())
                .authorizeHttpRequests(authorize -> authorize.requestMatchers(adminRoute).hasAnyAuthority(AccountRole.ADMIN.name()))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(privateRoute)
                        .hasAnyAuthority(AccountRole.CUSTOMER.name(), AccountRole.ADMIN.name())
                        .anyRequest()
                        .authenticated()
                )
                .addFilterBefore(this.jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(this.jwtAuthenticationEntryPoint))
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        List<String> allowedMethods = Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");
        List<String> allowedHeaders = Arrays.asList("authorization", "content-type", "x-auth-token", "origin", "x-request-with", "accept");
        List<String> exposedHeaders = List.of("x-auth-token");
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();

        corsConfiguration.setAllowedOrigins(List.of(this.allowedOrigins));
        corsConfiguration.setAllowedMethods(allowedMethods);
        corsConfiguration.setAllowedHeaders(allowedHeaders);
        corsConfiguration.setExposedHeaders(exposedHeaders);
        corsConfiguration.setAllowCredentials(true);
        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return corsConfigurationSource;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        int strength = 11;
        return new BCryptPasswordEncoder(strength);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public TaskScheduler taskScheduler() {
        String threadNamePrefix = "ThreadPoolTaskScheduler";
        int poolSize = 5;
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(poolSize);
        threadPoolTaskScheduler.setThreadNamePrefix(threadNamePrefix);
        return threadPoolTaskScheduler;
    }
}
