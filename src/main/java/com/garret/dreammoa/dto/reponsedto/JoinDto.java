package com.garret.dreammoa.dto.reponsedto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinDto {

    @Email(message = "유효한 이메일 형식이어야 합니다.")
    @NotEmpty(message = "Email은 필수입니다.")
    private String email;

    @NotEmpty(message = "Password는 필수입니다.")
    private String password;

    @NotEmpty(message = "Name은 필수입니다.")
    private String name;

    @NotEmpty(message = "Nickname은 필수입니다.")
    private String nickname;

}
