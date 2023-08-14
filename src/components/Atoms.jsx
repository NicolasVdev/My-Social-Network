import { atom } from 'jotai';

export const profileAtom = atom({
  user: null,
  userId: null
});

export const loginStateAtom = atom({
  identifier: '',
  password: '',
  user: null,
  userId: null
});

export const registrationStateAtom = atom ({
  username: '',
  email: '',
  password: ''
});