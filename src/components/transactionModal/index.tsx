import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useAddBalance } from '../../state/hooks/useAddBalance'
import IActions from '../../interface/action'
import { actionsWallet, balanceUser } from '../../state/atom'
import { useRecoilValue } from 'recoil'
import { useAddActionWallet } from '../../state/hooks/useAddActionWallet'
import useUpdateDatabaseUser from '../../state/hooks/useUpdateDatabaseUser'
import validateQuantity from '../../helpers/validations/validateQuantity'
import { useRemoveActionWallet } from '../../state/hooks/useRemoveActionWallet'

export default function TransactionModal({
  show,
  handleShow,
  action,
  walletBuyAndSell = false
}: {
  show: boolean
  handleShow: Dispatch<SetStateAction<boolean>>
  action: IActions | undefined
  walletBuyAndSell?: boolean
}) {
  const [quantityBuy, setQuantityBuy] = useState<string>('')
  const [quantitySell, setQuantitySell] = useState<string>('')
  const balance = useRecoilValue(balanceUser)
  const actionsWalletState = useRecoilValue(actionsWallet)
  const addBalance = useAddBalance()
  const addActionWallet = useAddActionWallet()
  const removeActionWallet = useRemoveActionWallet()
  const updateDatabaseUsers = useUpdateDatabaseUser()

  useEffect(() => {
    updateDatabaseUsers()
  }, [actionsWalletState])

  function negotiateAction(valueInput: string, sell?: boolean) {
    if (action) {
      const total = validateQuantity(valueInput, action.value, balance, sell)

      if (sell && parseInt(valueInput) > action.quantity) return
      if (total || total === 0) {
        const newAction = {
          name: action.name,
          quantity: parseInt(valueInput),
          value: action.value
        }
        addBalance(total)
        sell ? removeActionWallet(newAction) : addActionWallet([newAction])
      }
    }
  }

  return (
    <ReactModal
      isOpen={show}
      onRequestClose={() => handleShow(!show)}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      contentLabel="Interface para fazer depósito">
      <h1>{walletBuyAndSell ? 'Comprar ou Vender ação' : 'Comprar ação'}</h1>
      <table>
        <thead>
          <tr>
            <th>Ação</th>
            <th>Quantidade</th>
            <th>{'Valor (R$)'}</th>
          </tr>
        </thead>
        {action && (
          <tbody>
            <tr>
              <th>{action.name}</th>
              <th>{action.quantity}</th>
              <th>{action.value}</th>
            </tr>
          </tbody>
        )}
      </table>
      <div>
        <input
          type="number"
          placeholder="Informe a quantidade"
          onChange={e => setQuantityBuy(e.target.value)}
        />
        <button onClick={() => negotiateAction(quantityBuy)}>Comprar</button>
      </div>
      {walletBuyAndSell && (
        <div>
          <input
            type="number"
            placeholder="Informe a quantidade"
            onChange={e => setQuantitySell(e.target.value)}
          />
          <button onClick={() => negotiateAction(quantitySell, true)}>
            Vender
          </button>
        </div>
      )}
      <button onClick={() => handleShow(!show)}>Fechar</button>
    </ReactModal>
  )
}
