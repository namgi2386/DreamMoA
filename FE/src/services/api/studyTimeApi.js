import { instance } from '../axios';

export const getTotalStudyTime = async () => {
  try {
    const response = await instance.get('/api/study-time');
    return response.data.totalStudyTime; // 분 단위로 반환
  } catch (error) {
    console.error('Failed to fetch total study time:', error);
    return 0; // 에러 시 기본값 반환
  }
};