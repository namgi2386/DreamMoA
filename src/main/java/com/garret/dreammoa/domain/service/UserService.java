package com.garret.dreammoa.domain.service;

import com.garret.dreammoa.domain.dto.user.request.JoinRequest;
import com.garret.dreammoa.domain.model.FileEntity;
import com.garret.dreammoa.domain.model.UserEntity;
import com.garret.dreammoa.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FileService fileService;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, FileService fileService){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.fileService = fileService;
    }
    // 여기서 초기화

    @Transactional
    public void updateLastLogin(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
    }

    public void joinProcess(JoinRequest joinRequest){
        String email = joinRequest.getEmail();
        String password = joinRequest.getPassword();
        String name = joinRequest.getName();
        String nickname = joinRequest.getNickname();

        System.out.println("email = " + email);
        System.out.println("password = " + password);
        System.out.println("name = " + name);
        System.out.println("nickname = " + nickname);


        Boolean isExist = userRepository.existsByEmail(email);

        if(isExist){
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        UserEntity user = UserEntity.builder()
                .email(email)
                .password(bCryptPasswordEncoder.encode(password))
                .name(name)
                .nickname(nickname)
                .role(UserEntity.Role.USER) // 기본은 USER
                .build();

        userRepository.save(user);

        MultipartFile profilePicture = joinRequest.getProfilePicture();
        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                fileService.saveFile(profilePicture, user.getId(), FileEntity.RelatedType.PROFILE);
            } catch (Exception e) {
                System.out.println("프로필 사진 저장 중 오류 발생: " + e.getMessage());
                throw new RuntimeException("프로필 사진 저장에 실패했습니다.");
            }
        }
    }
}

