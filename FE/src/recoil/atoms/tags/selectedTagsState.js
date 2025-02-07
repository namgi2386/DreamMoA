// recoil/atoms/tagAtom.js
import { atom } from 'recoil';

export const selectedTagsState = atom({
  key: 'selectedTagsState', // unique key
  default: [], // 초기값은 빈 배열
});