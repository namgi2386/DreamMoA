package com.garret.dreammoa.dto;

import com.garret.dreammoa.model.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Getter
public class CustomUserDetails implements UserDetails {

    private final Long id; // 사용자 고유 ID
    private final String email; // 사용자 이메일 (아이디 역할)
    private final String password; // 암호화된 비밀번호
    private final Collection<? extends GrantedAuthority> authorities; // 사용자 권한 정보


    public CustomUserDetails(Long id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static CustomUserDetails fromEntity(Optional<UserEntity> user) {
        if (user.isEmpty()) {
            throw new IllegalArgumentException("UserEntity cannot be empty");
        }

        return new CustomUserDetails(
                user.get().getId(),
                user.get().getEmail(),
                user.get().getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.get().getRole().name()))
        );
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    // 계정 상태 관련 메서드들: 현재는 모두 true로 처리
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    @Override
    public boolean isAccountNonLocked() {
        return true;
    }


    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
