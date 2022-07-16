import { Dispatch, SetStateAction } from 'react'
import ReactModal from 'react-modal'

export default function DepositModal({
  show,
  handleShow
}: {
  show: boolean
  handleShow: Dispatch<SetStateAction<boolean>>
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
      <button onClick={() => handleShow(!show)}>Fechar</button>
      <h3>Depósito</h3>
    </ReactModal>
  )
}
