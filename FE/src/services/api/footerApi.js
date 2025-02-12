import api from './axios';

// 별들의 기준 위치
const BASE_POSITIONS = [
  { x: 0, y: 25 },  // 첫 번째 별
  { x: 70, y: 35 },  // 두 번째 별
  { x: 20, y: 50 },  // 세 번째 별
  { x: 60, y: 72 }   // 네 번째 별
];

// 각오 가져오기 (첫 4개만 사용)
export const getTopViewedDeterminations = async () => {
  try {
    const response = await api.get('/random-determinations');
    
    // 응답 데이터가 비어있거나 4개 미만인 경우 기본 데이터 반환
    if (!response.data || response.data.length < 4) {
      return [
        { id: 1, text: "오늘의 나는 어제의 나와 싸운다", x: 20, y: 25 },
        { id: 2, text: "영어 시험 900점!", x: 70, y: 35 },
        { id: 3, text: "프로그래머 되기", x: 60, y: 75 },
        { id: 4, text: "매일 6시에 기상하기", x: 10, y: 60 },
      ];
    }
    
    // 응답 데이터의 첫 4개만 사용하여 좌표와 함께 반환
    return response.data.slice(0, 4).map((text, index) => ({
      id: index + 1,
      text,
      ...getSlightlyRandomPosition(index)
    }));
  } catch (error) {
    console.error('Failed to fetch top viewed determinations:', error);
    throw error;
  }
};

// 기준 위치에서 약간만 벗어나는 랜덤 위치 생성
const getSlightlyRandomPosition = (index) => {
  const basePosition = BASE_POSITIONS[index];
  const variance = 5; // 기준 위치에서 ±5% 범위 내에서만 변동

  return {
    x: basePosition.x + (Math.random() - 0.5) * variance * 2, // 기준점 ±5% 범위
    y: basePosition.y + (Math.random() - 0.5) * variance * 2  // 기준점 ±5% 범위
  };
};