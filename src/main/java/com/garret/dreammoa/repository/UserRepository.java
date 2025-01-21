package com.garret.dreammoa.repository;

import com.garret.dreammoa.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Boolean existsByEmail(String email);

    Optional<UserEntity> findByEmail(String email);// 값이 없을 때 안정적 처리 지원
}
