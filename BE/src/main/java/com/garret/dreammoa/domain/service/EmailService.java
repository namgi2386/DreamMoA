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

        // Redis에 인증 코드 저장 (30분 동안 유효)
        redisTemplate.opsForValue().set(AUTH_CODE_PREFIX + email, verificationCode, Duration.ofMinutes(30));
        log.info("Redis에 인증 코드 저장: key={}, value={}, 만료시간=30분", AUTH_CODE_PREFIX + email, verificationCode);

        // 이메일 제목
        String title = "DreamMoa 이메일 인증 코드";

        // 이메일 내용 (HTML 형식)
        String htmlContent = """
                <!DOCTYPE html>
                <html lang="ko">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>DreamMoa 이메일 인증 코드</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 30px auto;
                            background: #ffffff;
                            border: 1px solid #e0e0e0;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #4caf50;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                        }
                        .content {
                            padding: 20px;
                            text-align: center;
                        }
                        .footer {
                            background-color: #f1f1f1;
                            color: #888888;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                        }
                        .verification-code {
                            font-size: 24px;
                            font-weight: bold;
                            color: #4caf50;
                            margin: 20px 0;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            margin: 20px 0;
                            background-color: #4caf50;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 4px;
                            font-weight: bold;
                        }
                        .button:hover {
                            background-color: #45a049;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>DreamMoa</h1>
                            <p>소중한 꿈을 모아 DreamMoA</p>
                        </div>
                        <div class="content">
                            <p>안녕하세요,</p>
                            <p>DreamMoa를 이용해주셔서 감사합니다.</p>
                            <p>아래 인증 코드를 입력하여 이메일 인증을 완료해주세요.</p>
                            <div class="verification-code">""" + verificationCode +

                """
                       </div>
                                    <p>이 인증 코드는 <strong>30분</strong> 동안만 유효합니다.</p>
                                    <p>DreamMoa와 함께 소중한 꿈을 이루세요!</p>
                                    <p><a href="https://file3.instiz.net/data/cached_img/upload/2020/01/19/4/764fe596bd92b8096180b4a0b4047360.jpg" class="button">인증 페이지로 이동</a></p>
                                </div>
                                <div class="footer">
                                    <p>본 이메일은 발신 전용입니다. 문의가 필요하시면 <a href="mailto:eunspear0216@gmail.com">support@dreammoa.com</a>으로 연락주세요.</p>
                                    <p>소중한 꿈을 모아 DreamMoA</p>
                                </div>
                            </div>
                        </body>
                        </html> """;

        // 이메일 전송
        mailService.sendEmail(email, title, htmlContent);
        log.info("인증 코드 이메일 전송: to={}, subject={}", email, title);
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
