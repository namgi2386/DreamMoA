import axios from 'axios';
import { authState } from '../../recoil/atoms/authState';


// 액세스 토큰을 저장할 변수
let currentAuthState  = null;
// Recoil 상태를 업데이트하는 함수
export const setAuthStateForAxios = (newState) => {
  currentAuthState = newState;
};


const httpClient = axios.create({
  baseURL: 'http://localhost:8080', // 실제 API 서버 주소의 기본주소
  timeout: 5000, // 요청 제한시간 5초
  headers: {
    'Content-Type': 'application/json',
  },  
  withCredentials: true  // 쿠키 포함 설정
});

// 요청 인터셉터
httpClient.interceptors.request.use(
  config => {
    if (currentAuthState?.accessToken) {
      config.headers.Authorization = `Bearer ${currentAuthState.accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 갱신 처리
httpClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await httpClient.post('/auth/refresh');
        const { accessToken } = response.data;

        // 전역 상태 업데이트를 위한 이벤트 발생
        if (window.dispatchEvent) {
          window.dispatchEvent(
            new CustomEvent('auth-token-refresh', { 
              detail: { accessToken } 
            })
          );
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        // 전역 상태 업데이트를 위한 이벤트 발생
        if (window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('auth-logout'));
        }
        
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);



export default httpClient;