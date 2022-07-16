import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import actions from '../mock/actions'
import Home from '../pages'

describe('Ao entrar na página home', () => {
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
  })

  it('deve existir um título com o texto "Minha carteira"', () => {
    const myWallet = screen.queryByRole('heading', {
      name: /Minha carteira/i
    })

    expect(myWallet).toBeInTheDocument()
  })

  it('deve existir um botão com o texto "Depósito/Retirada"', () => {
    const modalButton = screen.queryByRole('button', {
      name: /Depósito\/Retirada/i
    })

    expect(modalButton).toBeInTheDocument()
  })
})

describe('Ao clicar no botão "Depósito/Retirada"', () => {
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

  it('deve exibir um modal com um botão "Depósitar"', () => {
    const btnDeposit = screen.queryByRole('button', {
      name: /Depositar/i
    })

    expect(btnDeposit).toBeInTheDocument()
  })

  it('deve exibir um modal com um botão "Retirar"', () => {
    const btnRemove = screen.queryByRole('button', {
      name: /Retirar/i
    })

    expect(btnRemove).toBeInTheDocument()
  })
})
