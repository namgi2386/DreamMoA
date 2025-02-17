import { atom } from 'recoil';

export const aiFocusState = atom({
  key: 'aiFocusState',
  default: 1
});
export const screenTimeState = atom({
  key: 'screenTimeState',
  default: 0
});
export const pureTimeState = atom({
  key: 'pureTimeState',
  default: 0
});