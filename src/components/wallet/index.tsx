import { useState } from 'react'
import WalletModal from '../walletModal'

export default function Wallet() {
  const [showModalDeposit, setShowModalDeposit] = useState<boolean>(false)

  return (
    <aside>
      <h3>Minha carteira</h3>
      <button onClick={() => setShowModalDeposit(!showModalDeposit)}>
        Depósito/Retirada
      </button>
      <WalletModal show={showModalDeposit} handleShow={setShowModalDeposit} />
    </aside>
  )
}
