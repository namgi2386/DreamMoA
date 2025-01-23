package com.garret.dreammoa.controller.user;

import com.garret.dreammoa.dto.reponsedto.ErrorResponse;
import com.garret.dreammoa.dto.reponsedto.JoinDto;
import com.garret.dreammoa.dto.reponsedto.SuccessResponse;
import com.garret.dreammoa.service.JoinService;
import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
public class JoinController {

    private final JoinService joinService;


    public JoinController(JoinService joinService) {
        this.joinService = joinService;
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinProcess(@Valid @ModelAttribute JoinDto joinDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(errorMessage));
        }

        joinService.joinProcess(joinDto);
        return ResponseEntity.ok(new SuccessResponse("회원가입이 완료되었습니다."));
    }
}
