package com.garret.dreammoa.domain.controller.user;

import com.garret.dreammoa.domain.dto.common.ErrorResponse;
import com.garret.dreammoa.domain.dto.common.SuccessResponse;
import com.garret.dreammoa.domain.dto.user.request.JoinRequest;
import com.garret.dreammoa.domain.dto.user.response.UserResponse;
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
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

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

    @PostMapping("/userInfo")
    public ResponseEntity<?> userInfo(HttpServletRequest request) {
        // 1. 쿠키에서 accessToken 가져오기
        String accessToken = Arrays.stream(request.getCookies())
                .filter(cookie -> "access_token".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (accessToken == null) {
            return ResponseEntity.badRequest().body("Access Token이 없습니다.");
        }

        try {
            // 2. Service를 통해 UserResponse DTO 추출
            UserResponse userInfo = userService.extractUserInfo(accessToken);

            // 3. 유저 정보 반환
            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
