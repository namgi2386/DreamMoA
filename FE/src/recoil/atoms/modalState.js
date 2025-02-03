// src/recoil/atoms/modalAtom.js
import { atom } from 'recoil';

export const successModalState = atom({
  key: 'successModalState',
  default: {
    isOpen: false,
    message: '',
    onCancel: null,
    isCancellable: false,
  },
});