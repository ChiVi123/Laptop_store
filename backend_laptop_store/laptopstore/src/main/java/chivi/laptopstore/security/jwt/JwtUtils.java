package chivi.laptopstore.security.jwt;

import chivi.laptopstore.models.entities.AccountEntity;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Slf4j
@Component
public class JwtUtils {
    // https://github.com/jwtk/jjwt?tab=readme-ov-file#secret-keys
    private final SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();
    @Value("${app.jwt.expired}")
    private long jwtExpiration;
    @Value("${app.jwt.issuer}")
    private String ISSUER;

    public String getTokenFromAuthorizationHeader(HttpServletRequest httpServletRequest) {
        String headerName = "Authorization";
        String whiteSpace = " ";
        String value = httpServletRequest.getHeader(headerName);
        return value != null ? value.split(whiteSpace)[1].trim() : null;
    }

    // https://github.com/jwtk/jjwt?tab=readme-ov-file#constant-parsing-key
    public String getSubjectFromToken(String token) {
        try {
            return Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload().getSubject();
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }

        return null;
    }

    public String createTokenFromAccount(AccountEntity account) {
        return Jwts.builder()
                .subject(account.getEmail())
                .issuedAt(new Date())
                .issuer(ISSUER)
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(SECRET_KEY)
                .compact();
    }
}
