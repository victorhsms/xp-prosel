import { useRecoilValue, useSetRecoilState } from 'recoil'
import IActions from '../../interface/action'
import { actionsWallet } from '../atom'

export const useAddActionWallet = () => {
  const setActions = useSetRecoilState(actionsWallet)
  const actionsInState = useRecoilValue(actionsWallet)
  return (actions: IActions[]) => {
    return setActions([...actionsInState, ...actions])
  }
}
