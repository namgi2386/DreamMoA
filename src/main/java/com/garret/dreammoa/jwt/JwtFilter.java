package com.garret.dreammoa.jwt;

import com.garret.dreammoa.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider; // JWT 생성 및 검증 클래스
    private final CustomUserDetailsService userDetailsService; // 사용자 세부 정보 서비스

    private final String HEADER_AUTHORIZATION = "Authorization"; // HTTP Authorization 헤더
    private final String TOKEN_PREFIX = "Bearer "; // 토큰 접두사

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // 요청에서 JWT 토큰 추출
        String jwt = resolveToken(request);

        // JWT가 유효한 경우 사용자 인증 정보 설정
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            String email = tokenProvider.getEmailFromToken(jwt); // 토큰에서 이메일 추출

            UserDetails userDetails = userDetailsService.loadUserByUsername(email); // 사용자 정보 로드

            // Spring Security 컨텍스트에 인증 정보 설정
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }


    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(HEADER_AUTHORIZATION); // Authorization 헤더에서 토큰 추출
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length()); // "Bearer " 접두사 제거 후 반환
        }
        return null; // 토큰이 없으면 null 반환
    }
}
