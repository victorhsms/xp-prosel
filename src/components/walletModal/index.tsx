import { Dispatch, SetStateAction } from 'react'
import ReactModal from 'react-modal'
import { useRecoilValue } from 'recoil'
import { balanceUser } from '../../state/atom'

export default function WalletModal({
  show,
  handleShow
}: {
  show: boolean
  handleShow: Dispatch<SetStateAction<boolean>>
}) {
  const balance = useRecoilValue(balanceUser)
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={() => handleShow(!show)}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      contentLabel="Interface para fazer depósito">
      <span>Saldo em Conta:</span>
      <span data-testid="balance-wallet-modal">{`R$ ${balance}`}</span>
      <button>Retirar</button>
      <button>Depositar</button>
      <input type="text" placeholder="Informe um valor" />
      <button onClick={() => handleShow(!show)}>Voltar</button>
      <button onClick={() => handleShow(!show)}>Confirmar</button>
    </ReactModal>
  )
}
