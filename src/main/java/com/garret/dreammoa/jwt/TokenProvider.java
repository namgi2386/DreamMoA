package com.garret.dreammoa.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Slf4j
@Component
public class TokenProvider {

    // 나중에 환경 파일로 빼놓기
    private static final String JWT_SECRET = "SECRET-TOO-LONG-FOR-DEMO-PLEASE-USE-REAL-KEY-----123456789";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000L * 60 * 60 * 24 * 7; //1주

    private final Key key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());


     // Access Token 생성
     public String createAccessToken(String email, String name, String nickname) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_TIME);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(validity)
                .addClaims(Map.of(
                        "name", name,
                        "nickname", nickname
                ))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

     //Refresh Token 생성
     public String createRefreshToken(String email) {
         Date now = new Date();
         Date validity = new Date(now.getTime() + REFRESH_TOKEN_EXPIRE_TIME);

         return Jwts.builder()
                 .setSubject(email)
                 .setIssuedAt(now)
                 .setExpiration(validity)
                 .signWith(key, SignatureAlgorithm.HS256)
                 .compact();
     }

    //JWT에서 이메일 추출
    public String getEmailFromToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            log.error("유효하지 않은 JWT 토큰", e);
            return null;
        }
    }


    // 토큰에서 이름 추출
    public String getNameFromToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("name", String.class);
        } catch (JwtException e) {
            log.error("유효하지 않은 JWT 토큰", e);
            return null;
        }
    }

    // 토큰에서 닉네임 추출
    public String getNicknameFromToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("nickname", String.class);
        } catch (JwtException e) {
            log.error("유효하지 않은 JWT 토큰", e);
            return null;
        }
    }

    // 토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("유효하지 않은 JWT 서명.");
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰.");
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰.");
        } catch (IllegalArgumentException e) {
            log.error("JWT 클레임 문자열이 비어있습니다.");
        }
        return false;
    }
}