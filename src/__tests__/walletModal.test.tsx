import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { RecoilObserver } from '../mock/recoilObserver'
import { balanceUser, loggedUser } from '../state/atom'
import WalletModal from '../components/walletModal'

describe('Ao clicar no botão "Depósito/Retirada" deve exibir um modal', () => {
  beforeEach(() => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    render(
      <RecoilRoot>
        <WalletModal show={show} handleShow={mockHandleShow} />
      </RecoilRoot>
    )
  })

  it('com um botão "Depósitar"', () => {
    const btnDeposit = screen.queryByRole('button', {
      name: /Depositar/i
    })

    expect(btnDeposit).toBeInTheDocument()
  })

  it('com um botão "Retirar"', () => {
    const btnRemove = screen.queryByRole('button', {
      name: /Retirar/i
    })

    expect(btnRemove).toBeInTheDocument()
  })

  it('com um botão "Voltar"', () => {
    const btnBack = screen.queryByRole('button', {
      name: /Voltar/i
    })

    expect(btnBack).toBeInTheDocument()
  })

  it('com um botão "Confirmar"', () => {
    const btnConfirme = screen.queryByRole('button', {
      name: /Confirmar/i
    })

    expect(btnConfirme).toBeInTheDocument()
  })

  it('com um input de placeholder "Informe um valor"', () => {
    const inputValue = screen.queryByPlaceholderText('Informe um valor')

    expect(inputValue).toBeInTheDocument()
  })

  it('com um texto escrito "Saldo em Conta:"', () => {
    const spanValue = screen.queryByText('Saldo em Conta:')

    expect(spanValue).toBeInTheDocument()
  })

  it('com o saldo em conta zerado', () => {
    const spanValue = screen.getByTestId('balance-wallet-modal')

    expect(spanValue.textContent).toBe('R$ 0')
  })
})

describe('O botão confirmar deve estar desabilitado', () => {
  beforeEach(() => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    render(
      <RecoilRoot>
        <WalletModal show={show} handleShow={mockHandleShow} />
      </RecoilRoot>
    )
  })

  it('caso não seja digitado nada', () => {
    const btnConfirme = screen.queryByRole('button', {
      name: /Confirmar/i
    })

    expect(btnConfirme).toBeDisabled()
  })

  it('caso o valor seja 0', () => {
    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '0'
      }
    })

    const btnConfirme = screen.queryByRole('button', {
      name: /Confirmar/i
    })

    expect(btnConfirme).toBeDisabled()
  })

  it('caso o valor seja .', () => {
    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '.'
      }
    })

    const btnConfirme = screen.queryByRole('button', {
      name: /Confirmar/i
    })

    expect(btnConfirme).toBeDisabled()
  })

  it('caso o valor seja 0.', () => {
    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '0.'
      }
    })

    const btnConfirme = screen.queryByRole('button', {
      name: /Confirmar/i
    })

    expect(btnConfirme).toBeDisabled()
  })

  it('caso o valor seja .0', () => {
    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '.0'
      }
    })

    const btnConfirme = screen.queryByRole('button', {
      name: /Confirmar/i
    })

    expect(btnConfirme).toBeDisabled()
  })

  it('caso o valor seja negativo', () => {
    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '-100'
      }
    })

    const btnConfirme = screen.queryByRole('button', {
      name: /Confirmar/i
    })

    expect(btnConfirme).toBeDisabled()
  })
})

describe('O botão retirar deve estar desabilitado', () => {
  beforeEach(() => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    render(
      <RecoilRoot>
        <WalletModal show={show} handleShow={mockHandleShow} />
      </RecoilRoot>
    )
  })

  it('caso o saldo da conta esteja zerado', () => {
    const btnRemove = screen.queryByRole('button', {
      name: /Retirar/i
    })

    expect(btnRemove).toBeDisabled()
  })
})

describe('O valor do saldo em conta deve mudar', () => {
  it('Ao clicar em Depositar, digitar um valor e clicar em confirmar', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    render(
      <RecoilRoot>
        <RecoilObserver node={balanceUser} onChange={onChange} />
        <WalletModal show={show} handleShow={mockHandleShow} />
      </RecoilRoot>
    )

    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '50'
      }
    })

    const btnConfirme = screen.getByRole('button', {
      name: /Confirmar/i
    })
    fireEvent.click(btnConfirme)

    const balance = screen.getByTestId('balance-wallet-modal')
    expect(balance.textContent).toBe('R$ 50')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(0)
    expect(onChange).toHaveBeenCalledWith(50)
  })

  it('Ao clicar em Retirar, depois em Depositar, digitar um valor e clicar em confirmar', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const initializeState = ({ set }: any) => {
      set(balanceUser, 100)
      set(loggedUser, 'email@email.com')
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={balanceUser} onChange={onChange} />
        <WalletModal show={show} handleShow={mockHandleShow} />
      </RecoilRoot>
    )

    const btnRemove = screen.getByRole('button', {
      name: /Retirar/i
    })

    fireEvent.click(btnRemove)

    const btnDeposit = screen.getByRole('button', {
      name: /Depositar/i
    })

    fireEvent.click(btnDeposit)

    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '50'
      }
    })

    const btnConfirme = screen.getByRole('button', {
      name: /Confirmar/i
    })
    fireEvent.click(btnConfirme)

    const balance = screen.getByTestId('balance-wallet-modal')
    expect(balance.textContent).toBe('R$ 150')

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(100)
    expect(onChange).toHaveBeenCalledWith(150)
  })

  it('Ao clicar em Retirar, digitar um valor e clicar em confirmar', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const initializeState = ({ set }: any) => {
      set(balanceUser, 100)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={balanceUser} onChange={onChange} />
        <WalletModal show={show} handleShow={mockHandleShow} />
      </RecoilRoot>
    )

    const btnRemove = screen.getByRole('button', {
      name: /Retirar/i
    })

    fireEvent.click(btnRemove)

    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '30'
      }
    })

    const btnConfirme = screen.getByRole('button', {
      name: /Confirmar/i
    })
    fireEvent.click(btnConfirme)

    const balance = screen.getByTestId('balance-wallet-modal')
    expect(balance.textContent).toBe('R$ 70')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(100)
    expect(onChange).toHaveBeenCalledWith(70)
  })
})

describe('O valor do saldo da conta não deve mudar', () => {
  it('caso o valor retirado seja maior do que o saldo', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const initializeState = ({ set }: any) => {
      set(balanceUser, 20)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={balanceUser} onChange={onChange} />
        <WalletModal show={show} handleShow={mockHandleShow} />
      </RecoilRoot>
    )

    const btnRemove = screen.getByRole('button', {
      name: /Retirar/i
    })

    fireEvent.click(btnRemove)

    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '30'
      }
    })

    const btnConfirme = screen.getByRole('button', {
      name: /Confirmar/i
    })
    fireEvent.click(btnConfirme)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(20)
  })
})

describe('O modal deve deverá fechar', () => {
  const show = true
  const mockHandleShow = jest.fn()
  beforeEach(() => {
    const initializeState = ({ set }: any) => {
      set(balanceUser, 900)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <WalletModal show={show} handleShow={mockHandleShow} />
      </RecoilRoot>
    )
  })

  afterEach(() => {
    mockHandleShow.mockClear()
  })

  it('Ao clicar em voltar', () => {
    const btnBack = screen.getByRole('button', {
      name: /Voltar/i
    })

    fireEvent.click(btnBack)

    expect(mockHandleShow).toHaveBeenCalled()
    expect(mockHandleShow).toHaveBeenCalledTimes(1)
  })

  it('ao pressionar a tecla ESC', () => {
    const titleAccount = screen.getByText('Minha conta:')

    fireEvent.keyDown(titleAccount, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    })

    expect(mockHandleShow).toHaveBeenCalled()
    expect(mockHandleShow).toHaveBeenCalledTimes(1)
  })

  it('ao depositar com sucesso', () => {
    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '50'
      }
    })

    const btnConfirme = screen.getByRole('button', {
      name: /Confirmar/i
    })
    fireEvent.click(btnConfirme)

    expect(mockHandleShow).toHaveBeenCalled()
    expect(mockHandleShow).toHaveBeenCalledTimes(1)
  })

  it('ao sacar com sucesso', () => {
    const btnRemove = screen.getByRole('button', {
      name: /Retirar/i
    })

    fireEvent.click(btnRemove)

    const inputValue = screen.getByPlaceholderText('Informe um valor')
    fireEvent.change(inputValue, {
      target: {
        value: '30'
      }
    })

    const btnConfirme = screen.getByRole('button', {
      name: /Confirmar/i
    })

    fireEvent.click(btnConfirme)

    expect(mockHandleShow).toHaveBeenCalled()
    expect(mockHandleShow).toHaveBeenCalledTimes(1)
  })
})
