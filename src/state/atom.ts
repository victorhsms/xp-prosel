import { atom } from 'recoil'

export const loggedUser = atom<string>({
  key: 'loggedUser',
  default: ''
})
