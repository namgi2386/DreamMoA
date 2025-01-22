package com.garret.dreammoa.service;

import com.garret.dreammoa.dto.reponsedto.JoinDto;
import com.garret.dreammoa.model.FileEntity;
import com.garret.dreammoa.model.UserEntity;
import com.garret.dreammoa.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FileService fileService;


    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, FileService fileService){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.fileService = fileService;
    }
    // 여기서 초기화


    public void joinProcess(JoinDto joinDto){
        String email = joinDto.getEmail();
        String password = joinDto.getPassword();
        String name = joinDto.getName();
        String nickname = joinDto.getNickname();

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

        MultipartFile profilePicture = joinDto.getProfilePicture();
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

