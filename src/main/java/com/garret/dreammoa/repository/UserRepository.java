package com.garret.dreammoa.repository;

import com.garret.dreammoa.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Boolean existsByEmail(String email);

    UserEntity findByEmail(String email);
}
