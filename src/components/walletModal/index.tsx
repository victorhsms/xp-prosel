import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useRecoilValue } from 'recoil'
import { useAddBalance } from '../../state/hooks/useAddBalance'
import { balanceUser } from '../../state/atom'
import ModalStyled from './style'
import useUpdateDatabaseUser from '../../state/hooks/useUpdateDatabaseUser'
import validateBalance from '../../helpers/validations/validateBalance'

export default function WalletModal({
  show,
  handleShow
}: {
  show: boolean
  handleShow: Dispatch<SetStateAction<boolean>>
}) {
  const [balanceInput, setBalanceInput] = useState<string>('')
  const [selectDeposit, setSelectDeposit] = useState<boolean>(true)
  const [selectWithdraw, setSelectWithdraw] = useState<boolean>(false)
  const [btnConfirmeStatus, setBtnConfirmeStatus] = useState<boolean>(true)
  const balanceRecoilState = useRecoilValue(balanceUser)
  const setBalanceRecoilState = useAddBalance()
  const updateDatabaseUsers = useUpdateDatabaseUser()

  useEffect(() => {
    setBtnConfirmeStatus(!validateBalance(balanceInput))
  }, [balanceInput])

  useEffect(() => {
    updateDatabaseUsers()
  }, [balanceRecoilState])

  function changeOperation(operation: boolean) {
    if (!operation) {
      setSelectDeposit(!selectDeposit)
      setSelectWithdraw(!selectWithdraw)
    }
  }

  function setTransactionValue() {
    const inputValue = parseFloat(balanceInput)
    const newValueToState = selectDeposit
      ? balanceRecoilState + inputValue
      : balanceRecoilState - inputValue
    if (newValueToState < 0) return
    setBalanceRecoilState(newValueToState)
    if (newValueToState === 0) changeOperation(false) // caso retire o saldo até zerar, força a troca de operação
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
      <ModalStyled deposit={selectDeposit} withdraw={selectWithdraw}>
        <span>Saldo em Conta:</span>
        <span data-testid="balance-wallet-modal">{`R$ ${balanceRecoilState}`}</span>
        <button
          className="select-operation-deposit"
          onClick={() => changeOperation(selectDeposit)}>
          Depositar
        </button>
        <button
          className="select-operation-withdraw"
          disabled={balanceRecoilState === 0}
          onClick={() => changeOperation(selectWithdraw)}>
          Retirar
        </button>
        <input
          type="number"
          placeholder="Informe um valor"
          onChange={e => setBalanceInput(e.target.value)}
        />
        <button onClick={() => handleShow(!show)}>Voltar</button>
        <button disabled={btnConfirmeStatus} onClick={setTransactionValue}>
          Confirmar
        </button>
      </ModalStyled>
    </ReactModal>
  )
}
