package com.garret.dreammoa.controller;


import com.garret.dreammoa.dto.CustomUserDetails;
import com.garret.dreammoa.dto.reponsedto.TokenResponse;
import com.garret.dreammoa.dto.requestdto.LoginRequest;
import com.garret.dreammoa.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Authentication 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        // 실제 검증(비밀번호 체크)
        // CustomUserDetailsService.loadUserByUsername()가 실행됨
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();


        // 인증 성공 시 JWT 생성
        String accessToken = tokenProvider.createAccessToken(
                userDetails.getUsername(),
                userDetails.getName(),
                userDetails.getNickname()
        );
        String refreshToken = tokenProvider.createRefreshToken(request.getEmail());

        TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken);
        return ResponseEntity.ok(tokenResponse);
    }

}
