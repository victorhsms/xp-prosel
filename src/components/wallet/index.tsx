import { useState } from 'react'
import ReactModal from 'react-modal'
import DepositModal from '../depositModal'

export default function Wallet() {
  const [showModalDeposit, setShowModalDeposit] = useState<boolean>(false)
  return (
    <aside>
      <h3>Minha carteira</h3>
      <button onClick={() => setShowModalDeposit(!showModalDeposit)}>
        Depósito/Retirada
      </button>
      <DepositModal show={showModalDeposit} handleShow={setShowModalDeposit} />
    </aside>
  )
}
