package com.garret.dreammoa.controller;

import com.garret.dreammoa.dto.CustomUserDetails;
import com.garret.dreammoa.dto.reponsedto.ErrorResponse;
import com.garret.dreammoa.dto.reponsedto.TokenResponse;
import com.garret.dreammoa.dto.requestdto.LoginRequest;
import com.garret.dreammoa.jwt.TokenProvider;
import com.garret.dreammoa.model.FileEntity;
import com.garret.dreammoa.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final FileService fileService;

    public AuthController(AuthenticationManager authenticationManager, TokenProvider tokenProvider, FileService fileService ) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.fileService = fileService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        // Authentication 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        try {
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

            // 프로필 사진 URL 가져오기
            Long userId = userDetails.getId();
            Optional<FileEntity> profilePicture = fileService.getProfilePicture(userId);
            String profilePictureUrl = profilePicture.map(FileEntity::getFileUrl).orElse(null);

            TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken, profilePictureUrl);

            return ResponseEntity.ok(tokenResponse);

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid email or password."));
        }
    }
}