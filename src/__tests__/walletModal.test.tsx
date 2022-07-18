import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import actions from '../mock/actions'
import Home from '../pages'

describe('Ao clicar no botão "Depósito/Retirada" deve exibir um modal', () => {
  beforeEach(() => {
    const dateNow = new Date().toLocaleString()
    localStorage.setItem(
      'logged_user#xp-prosel',
      JSON.stringify(['email@email.com', dateNow])
    )
    render(
      <RecoilRoot>
        <Home actions={actions} />
      </RecoilRoot>
    )

    const modalButton = screen.getByRole('button', {
      name: /Depósito\/Retirada/i
    })

    fireEvent.click(modalButton)
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
    const dateNow = new Date().toLocaleString()
    localStorage.setItem(
      'logged_user#xp-prosel',
      JSON.stringify(['email@email.com', dateNow])
    )
    render(
      <RecoilRoot>
        <Home actions={actions} />
      </RecoilRoot>
    )

    const modalButton = screen.getByRole('button', {
      name: /Depósito\/Retirada/i
    })

    fireEvent.click(modalButton)
  })

  it('caso não seja digitado nada ou o saldo da conta seja 0', () => {
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

describe('Ao clicar em Depositar, digitar um valor e clicar em confirmar', () => {
  beforeEach(() => {
    const dateNow = new Date().toLocaleString()
    localStorage.setItem(
      'logged_user#xp-prosel',
      JSON.stringify(['email@email.com', dateNow])
    )
    render(
      <RecoilRoot>
        <Home actions={actions} />
      </RecoilRoot>
    )

    const modalButton = screen.getByRole('button', {
      name: /Depósito\/Retirada/i
    })

    fireEvent.click(modalButton)
  })

  it('o valor do saldo em conta deve aumentar', () => {
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

    const modalButton = screen.getByRole('button', {
      name: /Depósito\/Retirada/i
    })

    fireEvent.click(modalButton)

    const balance = screen.getByTestId('balance-wallet-modal')

    expect(balance.textContent).toBe('R$ 50')
  })
})
