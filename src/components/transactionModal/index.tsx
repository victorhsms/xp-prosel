import { Dispatch, SetStateAction } from 'react'
import ReactModal from 'react-modal'

export default function TransactionModal({
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
      <h1>Comprar ação</h1>
    </ReactModal>
  )
}
