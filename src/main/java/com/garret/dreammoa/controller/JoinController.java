package com.garret.dreammoa.controller;

import com.garret.dreammoa.dto.reponsedto.JoinDto;
import com.garret.dreammoa.service.JoinService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class JoinController {

    private final JoinService joinService;


    //@AutoWire 를 사용해도 되지만 직접 주입하는걸 권장
    public JoinController(JoinService joinService){
        this.joinService = joinService;
    }

    @PostMapping("/join")
    public String joinProcess(JoinDto joinDto){
        if (joinDto.getEmail() == null || joinDto.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email은 필수입니다.");
        }
        if (joinDto.getPassword() == null || joinDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password 필수입니다.");
        }

        if (joinDto.getName() == null || joinDto.getName().isEmpty()) {
            throw new IllegalArgumentException("name은 필수입니다.");
        }
        if (joinDto.getNickname() == null || joinDto.getNickname().isEmpty()) {
            throw new IllegalArgumentException("nickname은 필수입니다.");
        }




        joinService.joinProcess(joinDto);
    /*
    401, 404 등 회원가입이 안되면 이런 코드를 가져야 되는데 이번에는 간단하게 ok싸인을 넘겨주도록 한다.
     */
        return "ok";
    }
}
