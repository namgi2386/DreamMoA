package com.garret.dreammoa.domain.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final RedisTemplate<String, String> redisTemplate;
    private final MailService mailService;

    private static final String AUTH_CODE_PREFIX = "AuthCode_";


    /**
     * 인증 코드를 생성하고 Redis에 저장 후 이메일로 전송하는 메서드
     *
     * @param email 사용자 이메일
     */
    public void sendVerificationCode(String email) {
        String verificationCode = generateVerificationCode();
        // Redis에 인증 코드 저장 (키: AUTH_CODE_PREFIX + email, 값: verificationCode, 만료 시간: 30분)
        redisTemplate.opsForValue().set(AUTH_CODE_PREFIX + email, verificationCode, Duration.ofMinutes(30));
        log.info("Redis에 인증 코드 저장: key={}, value={}, 만료시간=30분", AUTH_CODE_PREFIX + email, verificationCode); // 추가

        // 이메일 전송
        String title = "DreamMoa 이메일 인증 코드";
        String text = "인증 코드는 " + verificationCode + "입니다. 30분 내에 입력해주세요.";
        mailService.sendEmail(email, title, text);
        log.info("인증 코드 이메일 전송: to={}, subject={}", email, title); // 추가
    }

    /**
     * 인증 코드를 검증하는 메서드
     *
     * @param email 사용자 이메일
     * @param code  입력된 인증 코드
     * @return 인증 성공 여부
     */
    public boolean verifyCode(String email, String code) {
        String storedCode = redisTemplate.opsForValue().get(AUTH_CODE_PREFIX + email);
        if (storedCode != null && storedCode.equals(code)) {
            // 인증 성공 시 Redis에서 인증 코드 삭제
            redisTemplate.delete(AUTH_CODE_PREFIX + email);
            log.info("인증 코드 검증 성공: email={}, code={}", email, code); // 추가
            return true;
        }
        log.warn("인증 코드 검증 실패: email={}, 입력된 코드={}, 저장된 코드={}", email, code, storedCode); // 추가
        return false;
    }
    /**
     * 랜덤 6자리 인증 코드를 생성하는 메서드
     *
     * @return 생성된 인증 코드
     */
    private String generateVerificationCode() {
        String code = UUID.randomUUID().toString().replaceAll("[^0-9]", "").substring(0, 6);
        log.debug("생성된 인증 코드: {}", code); // 추가
        return code;
    }
}
