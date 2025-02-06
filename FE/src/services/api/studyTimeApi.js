import api from './axios';

export const getTotalStudyTime = async () => {
  try {
    const response = await api.get('/api/study-time');
    return response.data.totalStudyTime;  // 분 단위
  } catch (error) {
    console.error('Failed to fetch total study time:', error);
    return 0;
  }
};