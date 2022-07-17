import { atom } from 'recoil'
import IActions from '../interface/action'

export const loggedUser = atom<string>({
  key: 'loggedUser',
  default: ''
})

export const balanceUser = atom<number>({
  key: 'balanceUser',
  default: 0
})

export const actionsWallet = atom<[] | IActions[]>({
  key: 'actionsUser',
  default: []
})

export const actionsStore = atom<[] | IActions[]>({
  key: 'actionsStore',
  default: []
})
