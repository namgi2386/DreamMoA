// src/services/api/auth.js
import httpClient from './axios';

// 로그인 함수
// httpClient : axios로 요청보내는 함수인데, post보낼거임
// 요청보내는 기본주소는 httpClient의 baseURL에 저장되어있음
// 나머지 주소가 /auth/login 인거임 (우선은 임시시)
// 보내는 파라미터 email, password
// 이메일 비번은 로그인페이지에서 가져올 예정임.
// 즉 여기에있는 login함수를 로그인페이지에서 사용함.
export const login = async (email, password) => {
  return httpClient.post('/login', {
    email,
    password
  });
};
export const logout = () => {
  return httpClient.post('/logout');
};