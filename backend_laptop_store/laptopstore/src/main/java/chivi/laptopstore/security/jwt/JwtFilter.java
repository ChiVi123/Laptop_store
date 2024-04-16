package chivi.laptopstore.security.jwt;

import chivi.laptopstore.security.account.AccountDetails;
import chivi.laptopstore.security.account.AccountDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final AccountDetailsService accountDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("getRequestURI:: {}", request.getRequestURI());

        String token = jwtUtils.getTokenFromAuthorizationHeader(request);
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String email = jwtUtils.getSubjectFromToken(token);
        if (email == null) {
            filterChain.doFilter(request, response);
            return;
        }

        AccountDetails accountDetails = (AccountDetails) accountDetailsService.loadUserByUsername(email);

        try {
            UsernamePasswordAuthenticationToken authenticationToken;
            authenticationToken = new UsernamePasswordAuthenticationToken(accountDetails, null, accountDetails.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (Exception exception) {
            log.error("Class name exception:: {}", exception.getClass().getName());
            log.error("Can't set account authentication:: {}", exception.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
