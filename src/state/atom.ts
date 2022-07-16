import { atom } from 'recoil'
import IActions from '../interface/action'

export const loggedUser = atom<string>({
  key: 'loggedUser',
  default: ''
})

export const actionsStore = atom<[] | IActions[]>({
  key: 'actionsStore',
  default: []
})
