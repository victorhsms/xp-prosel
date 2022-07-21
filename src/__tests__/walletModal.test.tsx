import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
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

describe('o valor do saldo em conta deve mudar', () => {
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

  it('Ao clicar em Depositar, digitar um valor e clicar em confirmar', () => {
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
  })
})
