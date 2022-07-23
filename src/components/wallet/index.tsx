import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { balanceUser } from '../../state/atom'
import WalletModal from '../walletModal'
import { WalletStyled } from './styled'

export default function Wallet() {
  const [showModalDeposit, setShowModalDeposit] = useState<boolean>(false)
  const balanceRecoilState = useRecoilValue(balanceUser)
  return (
    <WalletStyled>
      <h3>Minha carteira</h3>
      <div className="balance-container">
        <span>Saldo:</span>
        <span
          data-testid="balance-wallet"
          className="balance-quantity">{`R$ ${balanceRecoilState}`}</span>
      </div>
      <button onClick={() => setShowModalDeposit(!showModalDeposit)}>
        Depósito/Retirada
      </button>
      <WalletModal show={showModalDeposit} handleShow={setShowModalDeposit} />
    </WalletStyled>
  )
}
