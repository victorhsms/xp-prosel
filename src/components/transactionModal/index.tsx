import { Dispatch, SetStateAction, useState } from 'react'
import ReactModal from 'react-modal'
import { useAddBalance } from '../../state/hooks/useAddBalance'
import IActions from '../../interface/action'
import { balanceUser } from '../../state/atom'
import { useRecoilValue } from 'recoil'
import { useAddActionWallet } from '../../state/hooks/useAddActionWallet'

export default function TransactionModal({
  show,
  handleShow,
  action
}: {
  show: boolean
  handleShow: Dispatch<SetStateAction<boolean>>
  action: IActions | undefined
}) {
  const [valueInput, setValueInput] = useState<string>('')
  const balance = useRecoilValue(balanceUser)
  const addBalance = useAddBalance()
  const addActionWallet = useAddActionWallet()

  function buyAction() {
    if (action) {
      const quantity = parseInt(valueInput)
      const total = balance - action.value * quantity

      const newActionWallet = {
        name: action.name,
        quantity,
        value: action.value
      }

      addBalance(total)
      addActionWallet(newActionWallet)
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
      <h1>Comprar ação</h1>
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
      <input
        type="number"
        placeholder="Informe a quantidade"
        onChange={e => setValueInput(e.target.value)}
      />
      <button onClick={buyAction}>Comprar</button>
      <button onClick={() => handleShow(!show)}>Fechar</button>
    </ReactModal>
  )
}
