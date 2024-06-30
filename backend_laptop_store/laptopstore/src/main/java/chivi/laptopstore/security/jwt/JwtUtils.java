package chivi.laptopstore.security.jwt;

import chivi.laptopstore.models.Account;
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
    private String issuer;

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
        } catch (SignatureException signatureException) {
            log.error("Invalid JWT signature: {}", signatureException.getMessage());
        } catch (MalformedJwtException malformedJwtException) {
            log.error("Invalid JWT token: {}", malformedJwtException.getMessage());
        } catch (ExpiredJwtException expiredJwtException) {
            log.error("JWT token is expired: {}", expiredJwtException.getMessage());
        } catch (UnsupportedJwtException unsupportedJwtException) {
            log.error("JWT token is unsupported: {}", unsupportedJwtException.getMessage());
        } catch (IllegalArgumentException illegalArgumentException) {
            log.error("JWT claims string is empty: {}", illegalArgumentException.getMessage());
        }
        return null;
    }

    public String createTokenFromAccount(Account account) {
        return Jwts.builder()
                .subject(account.getEmail())
                .claim("username", account.getUsername())
                .claim("fullName", account.getFullName())
                .claim("phone", account.getPhone())
                .issuedAt(new Date())
                .issuer(issuer)
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(SECRET_KEY)
                .compact();
    }
}
