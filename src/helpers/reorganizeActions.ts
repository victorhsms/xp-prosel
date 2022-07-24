import IActions from '../interface/action'

export default function reorganizeAction(
  actionsInState: IActions[],
  actionBuyed: IActions[],
  repeatedAction: IActions
) {
  return actionsInState.map(action => {
    if (action.name === repeatedAction.name) {
      const newAction = {
        name: repeatedAction.name,
        quantity: actionBuyed[0].quantity + repeatedAction.quantity,
        value: repeatedAction.value
      }
      return newAction
    }
    console.log('Aqui!')
    return action
  })
}
