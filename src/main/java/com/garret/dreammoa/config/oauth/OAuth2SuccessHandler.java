    package com.garret.dreammoa.config.oauth;

    import com.garret.dreammoa.jwt.TokenProvider;
    import com.garret.dreammoa.model.UserEntity;
    import com.garret.dreammoa.repository.UserRepository;
    import com.garret.dreammoa.utils.CookieUtil;
    import com.nimbusds.oauth2.sdk.token.RefreshToken;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.core.Authentication;
    import org.springframework.security.oauth2.core.user.OAuth2User;
    import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
    import org.springframework.stereotype.Component;

    import java.io.IOException;
    import java.time.Duration;
    import java.util.Optional;

    @Component
    @RequiredArgsConstructor
    public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
        private final TokenProvider tokenProvider;
        private final UserRepository userRepository;

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = (String) oAuth2User.getAttributes().get("email");
            String name = (String) oAuth2User.getAttributes().get("name");

            // 사용자 확인 or 생성
            Optional<UserEntity> userOptional = userRepository.findByEmail(email);

            UserEntity user = userOptional.orElseGet(() -> {
                // Google에서 가져온 이름으로 새 사용자 생성
                UserEntity newUser = UserEntity.builder()
                        .email(email)
                        .name(name) // Google 프로필에서 이름 설정
                        .nickname(name) // 닉네임도 기본적으로 이름 사용
                        .role(UserEntity.Role.USER) // 기본 ROLE
                        .build();
                return userRepository.save(newUser);
            });

            if(!user.getName().equals(name)) {
                user.setName(name);
                userRepository.save(user);
            }

            // 쿠키에 aceess 토큰 저장
            String accessToken = tokenProvider.createAccessToken(user.getEmail());

            String refreshToken = tokenProvider.createRefreshToken(user.getEmail());

            tokenProvider.storeRefreshToken(user.getEmail(), refreshToken);

            CookieUtil.addHttpOnlyCookie(response, "access_token", accessToken, (int) tokenProvider.getAccessTokenExpirationTime());

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"message\": \"Authentication successful\"}");
        }
    }
