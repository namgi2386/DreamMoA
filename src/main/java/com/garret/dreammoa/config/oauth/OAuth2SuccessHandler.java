package com.garret.dreammoa.config.oauth;

import com.garret.dreammoa.jwt.TokenProvider;
import com.garret.dreammoa.model.UserEntity;
import com.garret.dreammoa.repository.UserRepository;
import com.garret.dreammoa.utils.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider; // JWT 생성 및 검증 클래스
    private final UserRepository userRepository; // 사용자 데이터베이스 관리

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal(); // 인증된 사용자 정보
        String email = (String) oAuth2User.getAttributes().get("email"); // Google 프로필에서 이메일 추출
        String name = (String) oAuth2User.getAttributes().get("name"); // Google 프로필에서 이름 추출

        // 사용자 확인 또는 새 사용자 생성
        Optional<UserEntity> userOptional = userRepository.findByEmail(email);

        UserEntity user = userOptional.orElseGet(() -> {
            UserEntity newUser = UserEntity.builder()
                    .email(email)
                    .name(name) // Google에서 가져온 이름 설정
                    .nickname(name) // 기본 닉네임은 이름과 동일하게 설정
                    .role(UserEntity.Role.USER) // 기본 역할 설정
                    .build();
            return userRepository.save(newUser);
        });

        // Google 프로필 이름 변경 시 데이터베이스 동기화
        if (!user.getName().equals(name)) {
            user.setName(name);
            userRepository.save(user);
        }

        // JWT 토큰 생성
        String accessToken = tokenProvider.createAccessToken(user.getEmail(), user.getName(), user.getNickname());
        String refreshToken = tokenProvider.createRefreshToken(user.getEmail()); // Redis에 저장됨

        // 쿠키에 토큰 저장
        CookieUtil.addHttpOnlyCookie(response, "access_token", accessToken, (int) tokenProvider.getAccessTokenExpirationTime());
        CookieUtil.addHttpOnlyCookie(response, "refresh_token", refreshToken, (int) tokenProvider.getRefreshTokenExpirationTime());

        // 성공 메시지 전송
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"message\": \"Authentication successful\"}");
    }
}
