// src/recoil/test/counterAtom.js
import { atom , selector, atomFamily } from 'recoil';

export const counterState = atom({
  key: 'counterState', // unique한 키 값
  default: 0, // 초기값
});

export const doubleCountState = selector({
  key: 'doubleCountState',
  get: ({get}) => {
    const count = get(counterState);
    return count * 2;
  },
});

export const counterFamily = atomFamily({
  key: 'counterFamily',
  default: (id) => {
    // localStorage에서 값을 읽어옴
    const savedValue = localStorage.getItem(`counter_${id}`);
    return savedValue ? Number(savedValue) : 0;
  },
  effects: (id) => [
    ({onSet}) => {
      onSet((newValue) => {
        // 값이 변경될 때마다 localStorage에 저장
        localStorage.setItem(`counter_${id}`, newValue);
      });
    },
  ],
});