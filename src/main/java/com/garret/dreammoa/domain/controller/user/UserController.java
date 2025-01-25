package com.garret.dreammoa.domain.controller.user;

import com.garret.dreammoa.domain.dto.common.ErrorResponse;
import com.garret.dreammoa.domain.dto.common.SuccessResponse;
import com.garret.dreammoa.domain.dto.user.request.JoinRequest;
import com.garret.dreammoa.domain.dto.user.request.SendVerificationCodeRequest;
import com.garret.dreammoa.domain.dto.user.request.VerifyCodeRequest;
import com.garret.dreammoa.domain.service.EmailService;
import com.garret.dreammoa.domain.service.UserService;
import com.garret.dreammoa.utils.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.CookieStore;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;


    @PostMapping("/join")
    public ResponseEntity<?> joinProcess(@Valid @RequestBody JoinRequest joinRequest, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(errorMessage));
        }

        userService.joinProcess(joinRequest);
        return ResponseEntity.ok(new SuccessResponse("회원가입이 완료되었습니다."));
    }

    @PostMapping("/send-verification-code")
    public ResponseEntity<?> sendVerificationCode(@Valid @RequestBody SendVerificationCodeRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(errorMessage));
        }

        try {
            emailService.sendVerificationCode(request.getEmail());
            return ResponseEntity.ok(new SuccessResponse("인증 코드가 이메일로 전송되었습니다."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/verify-email-code")
    public ResponseEntity<?> verifyEmailCode(@Valid @RequestBody VerifyCodeRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(errorMessage));
        }

        try {
            boolean isValid = userService.verifyEmailCode(request.getEmail(), request.getCode());
            if (isValid) {
                return ResponseEntity.ok(new SuccessResponse("인증 코드가 일치합니다."));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("인증 코드가 일치하지 않습니다."));
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/userInfo")
    public ResponseEntity<?> userInfo(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 accessToken 가져오기
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return ResponseEntity.badRequest().body("쿠키가 없습니다.");
        }

        String accessToken = Arrays.stream(cookies)
                .filter(cookie -> "access_token".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (accessToken == null) {
            return ResponseEntity.badRequest().body("Access Token이 없습니다.");
        }

        // 2. JWT에서 유저 정보 추출
        if (!jwtUtil.validateToken(accessToken)) {
            return ResponseEntity.status(401).body("유효하지 않은 Access Token입니다.");
        }

        String email = jwtUtil.getEmailFromToken(accessToken);
        String name = jwtUtil.getNameFromToken(accessToken);
        String nickname = jwtUtil.getNicknameFromToken(accessToken);

        if (email == null || name == null || nickname == null) {
            return ResponseEntity.status(401).body("토큰에서 유저 정보를 가져올 수 없습니다.");
        }

        // 3. 유저 정보 반환
        Map<String, String> userInfo = Map.of(
                "email", email,
                "name", name,
                "nickname", nickname
        );

        return ResponseEntity.ok(userInfo);
    }
}
