import { useRecoilValue } from 'recoil'
import { loggedUser } from '../atom'

export function useUser() {
  return useRecoilValue(loggedUser)
}
