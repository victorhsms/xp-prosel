import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home from '../pages'

describe('Ao entrar na página de login', () => {
  beforeEach(() => {
    const dateNow = new Date().toLocaleString()
    localStorage.setItem(
      'logged_user#xp-prosel',
      JSON.stringify(['email@email.com', dateNow])
    )
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    )
  })

  it('deve existir o texto "Disponível para investir"', () => {
    const myActions = screen.queryByRole('heading', {
      name: /Disponível para investir/i
    })

    expect(myActions).toBeInTheDocument()
  })

  it('deve existir uma tabela', () => {
    const table = screen.queryByTestId('actions-table')

    expect(table).toBeInTheDocument()
  })

  it('deve existir 4 theads na tabela', () => {
    const name = screen.queryByTestId('actions-actions-table')
    const quantity = screen.queryByTestId('quantity-actions-table')
    const value = screen.queryByTestId('value-actions-table')
    const negotiate = screen.queryByTestId('negotiate-actions-table')

    expect(name).toBeInTheDocument()
    expect(quantity).toBeInTheDocument()
    expect(value).toBeInTheDocument()
    expect(negotiate).toBeInTheDocument()
  })
})
