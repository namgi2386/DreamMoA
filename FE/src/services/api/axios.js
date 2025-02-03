import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://dreammoa.duckdns.org:8080",
  withCredentials: true, 
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // 로그아웃 요청의 경우 별도 처리
    if (config.url === '/logout') {
      return {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'application/json'
        }
      };
    }
    if (!config.url.includes('update-profile')) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
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
// 요청 인터셉터 - 모든 요청에 AccessToken 포함
// api.interceptors.request.use(
//   (config) => {
//     console.log("Request Config:", config);

//     const accessToken = localStorage.getItem("accessToken");
//     console.log("Access Token:", accessToken);

//     // 회원가입 요청에는 Authorization 헤더를 추가하지 않음
//     if (accessToken && !config.url.includes("/auth/join")) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     if (!config.headers['Content-Type']) {
//       config.headers['Content-Type'] = 'application/json';
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 응답 인터셉터 - 토큰 만료 처리
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("인터셉트 2번째");

//     // AccessToken 만료 에러 && 아직 재시도하지 않은 요청
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       console.log("access 만료인듯");

//       originalRequest._retry = true;

//       try {
//         // RefreshToken으로 새로운 AccessToken 발급 요청
//         console.log("리프레쉬 발급요청");

//         const response = await api.post('/auth/refresh');
//         console.log("리프레쉬 발급 받아옴");
//         const newAccessToken = response.data.accessToken;

//         // 새로운 AccessToken 저장
//         localStorage.setItem('accessToken', newAccessToken);

//         // 새로운 AccessToken으로 원래 요청 재시도
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // RefreshToken도 만료된 경우
//         localStorage.removeItem('accessToken');
//         window.location.href = '/login';  // 로그인 페이지로 리다이렉트
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );


