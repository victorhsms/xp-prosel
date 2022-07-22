import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import IActions from 'src/interface/action'
import { actionsWallet } from '../../state/atom'
import TransactionModal from '../transactionModal'

export default function WalletTable() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [actionSelected, setActionSelected] = useState<IActions>()
  const actions = useRecoilValue(actionsWallet)
  return (
    <div>
      <h3>Minhas Ações</h3>
      <table data-testid="wallet-table">
        <thead>
          <tr>
            <th data-testid="actions-wallet-table">Ações</th>
            <th data-testid="quantity-wallet-table">Quantidade</th>
            <th data-testid="value-wallet-table">{'Valor (R$)'}</th>
            <th data-testid="negotiate-wallet-table">Negociar</th>
          </tr>
        </thead>
        <tbody>
          {actions.length > 0 ? (
            actions.map(action => (
              <tr
                key={action.name}
                data-testid={`${action.name}-action-wallet-table`}
                onClick={() => {
                  setActionSelected(action)
                  setShowModal(!showModal)
                }}>
                <td data-testid={`${action.name}-name-wallet-table`}>
                  {action.name}
                </td>
                <td data-testid={`${action.name}-quantity-wallet-table`}>
                  {action.quantity}
                </td>
                <td data-testid={`${action.name}-value-wallet-table`}>
                  {action.value}
                </td>
              </tr>
            ))
          ) : (
            <tr data-testid="wallet-table-empty">
              <td colSpan={4}>
                Você não tem nenhuma ação comprada no momento!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TransactionModal
        show={showModal}
        handleShow={setShowModal}
        action={actionSelected}
        walletBuyAndSell={true}
      />
    </div>
  )
}
