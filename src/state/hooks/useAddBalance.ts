import { useSetRecoilState } from 'recoil'
import { balanceUser } from '../atom'

export function useAddBalance() {
  const addBalance = useSetRecoilState(balanceUser)
  return (balance: number) => {
    return addBalance(balance)
  }
}
