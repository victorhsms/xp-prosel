import { useRecoilValue, useSetRecoilState } from 'recoil'
import reorganizeAction from '../../helpers/reorganizeActions'
import IActions from '../../interface/action'
import { actionsWallet } from '../atom'

export const useAddActionWallet = () => {
  const setActions = useSetRecoilState(actionsWallet)
  const actionsInState = useRecoilValue(actionsWallet)
  return (actionBuyed: IActions[]) => {
    const repeatedAction = actionsInState.find(
      action => action.name === actionBuyed[0].name
    )

    if (repeatedAction) {
      const newActions = reorganizeAction(
        actionsInState,
        actionBuyed,
        repeatedAction
      )
      return setActions(newActions)
    }

    return setActions([...actionsInState, ...actionBuyed])
  }
}
