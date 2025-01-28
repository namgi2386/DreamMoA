package com.garret.dreammoa.domain.repository;

import com.garret.dreammoa.domain.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Boolean existsByEmail(String email);

    Optional<UserEntity> findByEmail(String email);// 값이 없을 때 안정적 처리 지원

//    Optional<UserEntity> findByName(String name);

//    Optional<UserEntity> findCurrentUser();
}
