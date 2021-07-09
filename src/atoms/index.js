import { atom } from 'recoil';

export const userIdAtom = atom({
  key: 'userIdAtom',
  default: '',
});

export const shortcutsAtom = atom({
  key: 'shortcutsAtom',
  default: [],
});