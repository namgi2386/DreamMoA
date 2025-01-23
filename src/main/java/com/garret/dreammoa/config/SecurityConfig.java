package com.garret.dreammoa.config;


import com.garret.dreammoa.jwt.JwtFilter;
import com.garret.dreammoa.jwt.TokenProvider;
import com.garret.dreammoa.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final TokenProvider tokenProvider;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CSRF 비활성화
                .csrf(AbstractHttpConfigurer::disable)
                // Form 로그인 비활성화
                .formLogin(AbstractHttpConfigurer::disable)
                // Basic 인증도 비활성화
                .httpBasic(AbstractHttpConfigurer::disable)
                // 예외처리(인증 실패 시 401 반환)
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                        })
                )
                // 인증/인가 설정
                .authorizeHttpRequests(auth -> auth
                        // Swagger UI 경로 인증 없이 허용
                        .requestMatchers(
                                "/v3/api-docs/**",  // OpenAPI 문서 JSON
                                "/swagger-ui/**",   // Swagger UI 리소스
                                "/swagger-ui.html", // Swagger UI 접속 페이지
                                "/webjars/**",      // Swagger가 사용하는 정적 리소스
                                "/swagger-resources/**"
                        ).permitAll()
                        .requestMatchers("/login", "/", "/join").permitAll()
                        .requestMatchers("/admin").hasRole("ADMIN")

                        // 특정 GET 요청 허용 (글 목록 조회만)
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/boards").permitAll()

                        // 상세 조회, 글 작성/수정/삭제는 로그인 사용자만
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/boards/{postId}").authenticated()
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/boards/**").authenticated()
                        .requestMatchers(org.springframework.http.HttpMethod.PUT, "/boards/**").authenticated()
                        .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/boards/**").authenticated()

                        .anyRequest().authenticated()

                )
                // JWT 필터
                .addFilterBefore(new JwtFilter(tokenProvider, userDetailsService),
                        UsernamePasswordAuthenticationFilter.class)
                // 세션 사용 안 함(STATELESS)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}