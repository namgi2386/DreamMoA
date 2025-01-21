import { atom } from 'recoil';

// 모든페이지 로그인 유지하기 위한 Atom 추가
// 로그인 되는 순간! isAuthenticated 값을 true
// user는 유저번호저장됨
export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null
  }
});