import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080", // 로컬컬
  // baseURL: "http://dreammoa.duckdns.org:8080/", // 배포주소
  withCredentials: false, // 쿠키 사용불가 (로그인+로그아웃 로직에서만 임시적으로 true 하기)
  headers: {
    Accept: "application/json",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     // 로그아웃 요청의 경우 별도 처리
//     if (config.url === '/logout') {
//       return {
//         ...config,
//         headers: {
//           ...config.headers,
//           'Content-Type': 'application/json'
//         }
//       };
//     }
//     if (!config.url.includes('update-profile')) {
//       config.headers['Content-Type'] = 'application/json';
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// ✅ 🔥 추가한 코드: Authorization 헤더 추가 (기존 코드 영향 없음)
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// Response Interceptor - token refresh 처리

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     // access token 만료로 인한 401 에러이고, 아직 재시도하지 않은 요청일 경우
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;  // 재시도 표시
      
//       try {
//         const refreshToken = document.cookie
//           .split('; ')
//           .find(row => row.startsWith('refreshToken='))
//           ?.split('=')[1];

//         // refresh 토큰으로 새로운 access 토큰 발급 요청
//         const response = await axios.post(
//           "http://localhost:8080/auth/refresh",
//           {},
//           {
//             headers: {
//               'Refresh-Token': `Bearer ${refreshToken}`
//             }
//           }
//         );

//         // 새로운 access 토큰 저장
//         const newAccessToken = response.data.accessToken;
//         localStorage.setItem("accessToken", newAccessToken);
        
//         // 실패했던 요청 재시도
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // refresh 토큰도 만료되었거나 유효하지 않은 경우
//         localStorage.removeItem("accessToken");
//         // 로그인 페이지로 리다이렉트 등 추가 처리
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

