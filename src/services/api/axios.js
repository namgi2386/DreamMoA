import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://your-api-url', // 실제 API 서버 주소의 기본주소
  timeout: 5000, // 요청 제한시간 5초
  headers: {
    'Content-Type': 'application/json',
  }
});

// 응답 인터셉터 설정
// 모든 응답은 여기로 옴
// 에러발생시 401에러 로직 포함되어있음
httpClient.interceptors.response.use(
  response => response,
  error => {
    // 에러 처리
    if (error.response.status === 401) {
      // 인증 에러 처리
      console.log('인증 에러');
    }
    return Promise.reject(error);
  }
);

export default httpClient;