import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    accessToken: null,
  }
});

export const userState = atom({
  key: 'userState',
  default: null,
});
