package com.garret.dreammoa.domain.controller.user;


import com.garret.dreammoa.domain.dto.user.CustomUserDetails;
import com.garret.dreammoa.domain.dto.user.response.TokenResponse;
import com.garret.dreammoa.domain.dto.user.request.LoginRequest;
import com.garret.dreammoa.domain.service.UserService;
import com.garret.dreammoa.utils.JwtUtil;
import com.garret.dreammoa.domain.model.FileEntity;
import com.garret.dreammoa.domain.model.UserEntity;
import com.garret.dreammoa.domain.repository.UserRepository;
import com.garret.dreammoa.domain.service.FileService;
import com.garret.dreammoa.utils.CookieUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.redis.core.RedisTemplate;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final UserRepository userRepository;
    private final FileService fileService;
    private final UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, BindingResult bindingResult, HttpServletResponse response) {
        Logger logger = LoggerFactory.getLogger(AuthController.class);

        logger.info("🟢 [로그인 요청] Email: {}", request.getEmail());

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> {
                errors.put(error.getField(), error.getDefaultMessage());
                logger.warn("⚠️ [입력값 오류] Field: {}, Message: {}", error.getField(), error.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            // 1️⃣ 이메일로 사용자 정보 조회
            UserEntity userEntity = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> {
                        logger.error("❌ [사용자 조회 실패] 이메일이 존재하지 않음: {}", request.getEmail());
                        return new IllegalArgumentException("User not found");
                    });

            logger.info("✅ [사용자 조회 성공] Email: {}", userEntity.getEmail());
            logger.info("🔐 [DB 저장된 비밀번호] {}", userEntity.getPassword());

            // 2️⃣ 비밀번호 비교 (로그 추가)
            logger.info("🔑 [입력한 비밀번호] {}", request.getPassword());

            if (!passwordEncoder.matches(request.getPassword(), userEntity.getPassword())) {
                logger.error("❌ [비밀번호 불일치] 입력한 비밀번호가 다름");
                return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("Invalid credentials");
            }

            // 3️⃣ 인증 객체 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

            // 4️⃣ Spring Security 인증 실행
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            logger.info("✅ [인증 성공] Email: {}", request.getEmail());

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            // 5️⃣ JWT 토큰 생성
            String accessToken = jwtUtil.createAccessToken(
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getName(),
                    userDetails.getNickname()
            );
            String refreshToken = jwtUtil.createRefreshToken(userEntity);
            logger.info("🔑 [토큰 생성 완료] AccessToken: {}, RefreshToken: {}", accessToken, refreshToken);

            // 6️⃣ 마지막 로그인 업데이트
            userService.updateLastLogin(userDetails.getId());
            logger.info("🕒 [마지막 로그인 업데이트] UserId: {}", userDetails.getId());

            // 7️⃣ 리프레시 토큰을 쿠키에 저장 (RT는 쿠키에만 담아 전송)
            CookieUtil.addCookie(response, "refresh_token", refreshToken, (int) jwtUtil.getRefreshTokenExpirationTime());
            logger.info("🍪 [쿠키 저장] RefreshToken 저장 완료");

            // 8️⃣ 액세스 토큰은 응답 본문에만 담아 전송 (AT는 메시지 바디)
            Map<String, String> tokenResponse = new HashMap<>();
            tokenResponse.put("accessToken", accessToken);

            return ResponseEntity.ok(tokenResponse);

        } catch (Exception e) {
            logger.error("❌ [로그인 실패] 원인: {}", e.getMessage());
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("Invalid credentials");
        }
    }






    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        // 리프레시 토큰 쿠키에서 추출
        String refreshToken = extractTokenFromCookie(request, "refresh_token");

        // 리프레시 토큰 검증 및 액세스 토큰 갱신
        if (refreshToken != null && jwtUtil.validateToken(refreshToken)) {
            Long userId = Long.valueOf(jwtUtil.getUserIdFromToken(refreshToken));
            String email = jwtUtil.getEmailFromToken(refreshToken);
            String name = jwtUtil.getNameFromToken(refreshToken);
            String nickname = jwtUtil.getNicknameFromToken(refreshToken);

            if (jwtUtil.isRefreshTokenValid(userId, refreshToken)) {
                // 새로운 액세스 토큰 생성
                String newAccessToken = jwtUtil.createAccessToken(userId, email, name, nickname);

                // 쿠키에 저장
                CookieUtil.addHttpOnlyCookie(response, "access_token", newAccessToken, (int) jwtUtil.getAccessTokenExpirationTime());
                return ResponseEntity.ok(new TokenResponse(newAccessToken, null));
            }
        }
        return ResponseEntity.status(401).body("Invalid refresh token");
    }


    @PostMapping("/user-logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 리프레시 토큰 쿠키에서 추출
        String refreshToken = extractTokenFromCookie(request, "refresh_token");

        if (refreshToken != null) {
            String email = jwtUtil.getEmailFromToken(refreshToken);
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
