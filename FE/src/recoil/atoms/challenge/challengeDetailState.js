import { atom } from 'recoil';

// 모달의 열림/닫힘 상태를 관리하는 atom
export const challengeModalState = atom({
  key: 'challengeModalState', // 고유한 키 값
  default: false, // 기본값은 모달이 닫힌 상태
});

// 선택된 챌린지 정보를 관리하는 atom
export const selectedChallengeState = atom({
  key: 'selectedChallengeState',
  default: {
    challengeId: null,
    title: '',
    description: '',
    maxParticipants: 0,
    isPrivate: false,
    createdAt: '',
    startDate: '',
    expireDate: '',
    isActive: false,
    standard: 0,
    thumbnail: '',
    message: '',
    token: null,
    challengeTags: [],
    challengeLogId: null,
    recordAt: null,
    pureStudyTime: null,
    screenTime: null,
    isSuccess: null
  }
});