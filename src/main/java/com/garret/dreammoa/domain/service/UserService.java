package com.garret.dreammoa.domain.service;

import com.garret.dreammoa.domain.dto.user.request.JoinRequest;
import com.garret.dreammoa.domain.model.FileEntity;
import com.garret.dreammoa.domain.model.UserEntity;
import com.garret.dreammoa.domain.repository.UserRepository;
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
    private final EmailService emailService;



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
        boolean verityEmail = joinRequest.isVerifyEmail();

        if(!verityEmail){
            throw new RuntimeException("이메일 인증이 완료되지 않았습니다.");
        }

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
            throw new RuntimeException("비밀번호에 이메일 이름이 포함될 수 없습니다.");
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

    /**
     * 이메일 중복 여부를 확인하는 메서드
     *
     * @param email 사용자 이메일
     * @return 이메일이 사용 가능하면 true, 아니면 false
     */
    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

    /**
     * 이메일 인증 코드 검증 메서드
     * @param email 사용자 이메일
     * @param inputCode 사용자가 입력한 인증 코드
     * @return 인증 코드가 일치하면 true, 아니면 false
     */
    public boolean verifyEmailCode(String email, String inputCode) {
        return emailService.verifyCode(email, inputCode);
    }

}
