import { useRecoilValue, useSetRecoilState } from 'recoil'
import reorganizeAction from '../../helpers/reorganizeActions'
import IActions from '../../interface/action'
import { actionsWallet } from '../atom'

export const useRemoveActionWallet = () => {
  const setActions = useSetRecoilState(actionsWallet)
  const actionsInState = useRecoilValue(actionsWallet)
  return (actionSelled: IActions) => {
    const repeatedAction = actionsInState.find(
      action => action.name === actionSelled.name
    )
    if (repeatedAction) {
      // action exists
      if (repeatedAction.quantity - actionSelled.quantity === 0) {
        // sold out
        return setActions(
          actionsInState.filter(action => action.name !== actionSelled.name)
        )
      }

      // sold some units
      const atualizatedAction = actionsInState.map(action => {
        if (action.name === repeatedAction.name) {
          const newAction = {
            name: repeatedAction.name,
            quantity: action.quantity - actionSelled.quantity,
            value: repeatedAction.value
          }
          return newAction
        }
        return action
      })

      return setActions(atualizatedAction)
    }
  }
}
