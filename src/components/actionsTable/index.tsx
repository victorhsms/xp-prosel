import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import IActions from 'src/interface/action'
import { actionsStore } from '../../state/atom'
import TransactionModal from '../transactionModal'

export default function ActionsTable() {
  const [showModalBuy, setShowModalBuy] = useState<boolean>(false)
  const actions = useRecoilValue(actionsStore)
  const [actionSelected, setActionSelected] = useState<IActions>(actions[0])
  return (
    <div>
      <h3>Disponível para investir</h3>
      <table data-testid="actions-table">
        <thead>
          <tr>
            <th data-testid="actions-actions-table">Ações</th>
            <th data-testid="quantity-actions-table">Quantidade</th>
            <th data-testid="value-actions-table">{'Valor (R$)'}</th>
            <th data-testid="negotiate-actions-table">Negociar</th>
          </tr>
        </thead>
        <tbody>
          {actions.map(action => (
            <tr key={action.name}>
              <th data-testid={`${action.name}-name-table`}>{action.name}</th>
              <th>{action.quantity}</th>
              <th>{action.value}</th>
              <th>
                <button
                  data-testid={`${action.name}-buy-table`}
                  onClick={() => {
                    setActionSelected(action)
                    setShowModalBuy(!showModalBuy)
                  }}>
                  Comprar
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <TransactionModal
        show={showModalBuy}
        handleShow={setShowModalBuy}
        action={actionSelected}
      />
    </div>
  )
}
