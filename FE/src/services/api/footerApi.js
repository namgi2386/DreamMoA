import api from './axios';

// 상위 조회수 결심 가져오기 (첫 3개만 사용)
export const getTopViewedDeterminations = async () => {
  try {
    const response = await api.get('/random-determinations');
    
    // 응답 데이터가 비어있거나 3개 미만인 경우 기본 데이터 반환
    if (!response.data || response.data.length < 3) {
      return [
        { id: 1, text: "오늘의 나는 어제의 나와 싸운다", x: 30, y: 30 },
        { id: 2, text: "영어 시험 900점!", x: 60, y: 60 },
        { id: 3, text: "프로그래머 되기", x: 20, y: 70 },
      ];
    }
    
    // 응답 데이터의 첫 3개만 사용하여 좌표와 함께 반환
    return response.data.slice(0, 3).map((text, index) => ({
      id: index + 1,
      text,
      ...getRandomPosition()
    }));
  } catch (error) {
    console.error('Failed to fetch top viewed determinations:', error);
    throw error;
  }
};

// 랜덤 위치 생성 헬퍼 함수
const getRandomPosition = () => ({
  x: 20 + Math.random() * 50, // 20% ~ 70% 범위
  y: 20 + Math.random() * 50  // 20% ~ 70% 범위
});