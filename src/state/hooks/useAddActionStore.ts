import { useSetRecoilState } from 'recoil'
import IActions from '../../interface/action'
import { actionsStore } from '../atom'

export const useAddActionStore = () => {
  const setActions = useSetRecoilState(actionsStore)
  return (actions: IActions[]) => {
    return setActions(actions)
  }
}
