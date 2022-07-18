import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { balanceUser } from '../../state/atom'
import WalletModal from '../walletModal'

export default function Wallet() {
  const [showModalDeposit, setShowModalDeposit] = useState<boolean>(false)
  const balanceRecoilState = useRecoilValue(balanceUser)
  return (
    <aside>
      <h3>Minha carteira</h3>
      <span>Saldo:</span>
      <span data-testid="balance-wallet">{`R$ ${balanceRecoilState}`}</span>
      <button onClick={() => setShowModalDeposit(!showModalDeposit)}>
        Depósito/Retirada
      </button>
      <WalletModal show={showModalDeposit} handleShow={setShowModalDeposit} />
    </aside>
  )
}
