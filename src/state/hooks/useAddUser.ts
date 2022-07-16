import { useSetRecoilState } from 'recoil'
import { loggedUser } from '../atom'

export const useAddUser = () => {
  const setUser = useSetRecoilState(loggedUser)
  return (email: string) => {
    return setUser(email)
  }
}
