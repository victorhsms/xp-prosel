import { useState } from 'react'

export default function Wallet() {
  const [showModalDeposit, setShowModalDeposit] = useState<boolean>(false)
  return (
    <aside>
      <h3>Minha carteira</h3>
      <button onClick={() => setShowModalDeposit(!showModalDeposit)}>
        Fazer depósito
      </button>

      <button>Retirar saldo</button>
    </aside>
  )
}
