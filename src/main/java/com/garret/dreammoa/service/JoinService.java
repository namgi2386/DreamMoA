package com.garret.dreammoa.service;

import com.garret.dreammoa.dto.reponsedto.JoinDto;
import com.garret.dreammoa.model.UserEntity;
import com.garret.dreammoa.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
            System.out.println("중복임");
            return;
        }

        UserEntity data = new UserEntity();

        data.setEmail(email);
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setName(name);
        data.setNickname(nickname);
        data.setRole(UserEntity.Role.ADMIN);
        // 지금은 강제로 "ROlE_ADMIN"이라고 넣음

        userRepository.save(data);
    }
}

