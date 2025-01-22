package com.garret.dreammoa.controller;


import com.garret.dreammoa.dto.CustomUserDetails;
import com.garret.dreammoa.dto.reponsedto.TokenResponse;
import com.garret.dreammoa.dto.requestdto.LoginRequest;
import com.garret.dreammoa.jwt.TokenProvider;
import com.garret.dreammoa.utils.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.redis.core.RedisTemplate;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        // 이메일과 비밀번호로 인증 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        // 인증 수행
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();


        // 인증 성공 시 JWT 생성
        String accessToken = tokenProvider.createAccessToken(
                userDetails.getUsername(),
                userDetails.getName(),
                userDetails.getNickname()
        );
        String refreshToken = tokenProvider.createRefreshToken(request.getEmail());

        // 쿠키에 토큰 저장
        CookieUtil.addHttpOnlyCookie(response, "access_token", accessToken, (int) tokenProvider.getAccessTokenExpirationTime());
        CookieUtil.addHttpOnlyCookie(response, "refresh_token", refreshToken, (int) tokenProvider.getRefreshTokenExpirationTime());

        // 응답 본문으로도 토큰 반환
        return ResponseEntity.ok(new TokenResponse(accessToken, refreshToken));
    }


    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        // 리프레시 토큰 쿠키에서 추출
        String refreshToken = extractTokenFromCookie(request, "refresh_token");

        // 리프레시 토큰 검증 및 액세스 토큰 갱신
        if (refreshToken != null && tokenProvider.validateToken(refreshToken)) {
            String email = tokenProvider.getEmailFromToken(refreshToken);
            String name = tokenProvider.getNameFromToken(refreshToken);
            String nickname = tokenProvider.getNicknameFromToken(refreshToken);

            if (tokenProvider.isRefreshTokenValid(email, refreshToken)) {
                // 새로운 액세스 토큰 생성
                String newAccessToken = tokenProvider.createAccessToken(email, name, nickname);

                // 쿠키에 저장
                CookieUtil.addHttpOnlyCookie(response, "access_token", newAccessToken, (int) tokenProvider.getAccessTokenExpirationTime());
                return ResponseEntity.ok(new TokenResponse(newAccessToken, null));
            }
        }

        return ResponseEntity.status(401).body("Invalid refresh token");
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 리프레시 토큰 쿠키에서 추출
        String refreshToken = extractTokenFromCookie(request, "refresh_token");

        if (refreshToken != null) {
            String email = tokenProvider.getEmailFromToken(refreshToken);
            // Redis에서 리프레시 토큰 제거
            redisTemplate.delete(email); // Redis에서 해당 토큰 제거

            // 쿠키 삭제
            CookieUtil.deleteCookie(request, response, "access_token");
            CookieUtil.deleteCookie(request, response, "refresh_token");
        }

        return ResponseEntity.ok("Successfully logged out");
    }

    // 쿠키에서 특정 이름의 토큰 값을 추출
    private String extractTokenFromCookie(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
