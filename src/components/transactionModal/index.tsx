import { Dispatch, SetStateAction } from 'react'
import ReactModal from 'react-modal'
import IActions from '../../interface/action'

export default function TransactionModal({
  show,
  handleShow,
  action
}: {
  show: boolean
  handleShow: Dispatch<SetStateAction<boolean>>
  action: IActions | undefined
}) {
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
            <th>{'Valor'}</th>
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
      <input type="text" placeholder="Informe um valor" />
      <button>Comprar</button>
      <button onClick={() => handleShow(!show)}>Fechar</button>
    </ReactModal>
  )
}
