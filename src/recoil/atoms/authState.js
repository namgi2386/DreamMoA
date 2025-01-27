import { atom, selector } from 'recoil';
import getUserApi from '../../services/api/getUserApi';

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    accessToken: null,
  }
});

// 수정 가능한 상태를 위한 atom
export const userState = atom({
  key: 'userState',
  default: null,
});

// 비동기 데이터 fetching을 위한 selector
export const userInfoState = selector({
  key: 'userInfoState',
  get: async () => {
    const response = await getUserApi.getUserInfo();
    return response.data;
  },
});