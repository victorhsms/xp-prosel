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
