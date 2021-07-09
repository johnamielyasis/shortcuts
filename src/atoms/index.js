import { atom } from 'recoil';

export const userIdAtom = atom({
  key: 'userIdAtom',
  default: '',
});

export const shortcutsAtom = atom({
  key: 'shortcutsAtom',
  default: [],
});

export const categoryAtom = atom({
  key: 'categoryAtom',
  default: ''
})