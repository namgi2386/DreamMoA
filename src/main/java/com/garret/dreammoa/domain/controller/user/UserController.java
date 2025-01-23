package com.garret.dreammoa.domain.controller.user;

import com.garret.dreammoa.domain.dto.common.ErrorResponse;
import com.garret.dreammoa.domain.dto.common.SuccessResponse;
import com.garret.dreammoa.domain.dto.user.request.JoinRequest;
import com.garret.dreammoa.domain.service.UserService;
import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinProcess(@Valid @ModelAttribute JoinRequest joinRequest, BindingResult bindingResult) {
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
}
