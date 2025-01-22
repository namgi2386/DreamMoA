package com.garret.dreammoa.dto;

import com.garret.dreammoa.model.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Getter
public class CustomUserDetails implements UserDetails {

    private final String email;
    private final String password;
    private final String name;
    private final String nickname;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(UserEntity user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
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
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public String getUsername() {
        return email;
    }

    // 계정 만료, 잠금, 자격 증명 만료, 활성화 상태에 대한 메서드
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