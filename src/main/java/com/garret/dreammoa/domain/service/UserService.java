package com.garret.dreammoa.domain.service;

import com.garret.dreammoa.domain.dto.user.request.JoinRequest;
import com.garret.dreammoa.domain.dto.user.response.UserResponse;
import com.garret.dreammoa.domain.model.FileEntity;
import com.garret.dreammoa.domain.model.UserEntity;
import com.garret.dreammoa.domain.repository.UserRepository;
import com.garret.dreammoa.utils.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FileService fileService;
    private final JwtUtil jwtUtil;

    // 여기서 초기화

    @Transactional
    public void updateLastLogin(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public void joinProcess(JoinRequest joinRequest){
        String email = joinRequest.getEmail();
        String password = joinRequest.getPassword();
        String name = joinRequest.getName();
        String nickname = joinRequest.getNickname();

        // 이메일 중복 체크
        if(userRepository.existsByEmail(email)){
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        // 닉네임 중복 체크
        if(userRepository.existsByNickname(nickname)){
            throw new RuntimeException("이미 존재하는 닉네임입니다.");
        }

        // 비밀번호에 이메일 로컬 파트 포함 여부 검증
        String emailLocalPart = email.split("@")[0].toLowerCase();
        String passwordLower = password.toLowerCase();
        if(passwordLower.contains(emailLocalPart)){
            throw new RuntimeException("비밀번호에 이메일의 로컬 파트가 포함될 수 없습니다.");
        }

        // 사용자 엔티티 생성
        UserEntity user = UserEntity.builder()
                .email(email)
                .password(bCryptPasswordEncoder.encode(password))
                .name(name)
                .nickname(nickname)
                .role(UserEntity.Role.USER) // 기본 역할 USER
                .build();

        userRepository.save(user);
    }


    public UserResponse extractUserInfo(String accessToken) {
        // JWT 토큰 검증
        if (!jwtUtil.validateToken(accessToken)) {
            throw new RuntimeException("유효하지 않은 Access Token입니다.");
        }

        // 토큰에서 유저 정보 추출
        String email = jwtUtil.getEmailFromToken(accessToken);
        String name = jwtUtil.getNameFromToken(accessToken);
        String nickname = jwtUtil.getNicknameFromToken(accessToken);

        if (email == null || name == null || nickname == null) {
            throw new RuntimeException("토큰에서 유저 정보를 가져올 수 없습니다.");
        }

        // 유저 정보 반환
        return new UserResponse(email, name, nickname);
    }

    public String findByEmailByNicknameAndName(String nickname, String name) {
        UserEntity user = userRepository.findByNicknameAndName(nickname, name)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        return user.getEmail();
    }
}
