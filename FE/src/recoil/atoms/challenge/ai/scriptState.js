import { atom } from 'recoil';

// 스피커 관련 atoms
export const scriptOnOffState = atom({
  key: 'scriptOnOffState',
  default: true
});