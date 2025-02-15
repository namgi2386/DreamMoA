import { atom } from 'recoil';

export const popularChallengesState = atom({
  key: 'popularChallengesState',
  default: []
});

export const runningChallengesState = atom({
  key: 'runningChallengesState',
  default: []
});

export const recruitingChallengesState = atom({
  key: 'recruitingChallengesState',
  default: []
});