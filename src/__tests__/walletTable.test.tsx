import {
  queryAllByRole,
  queryAllByTestId,
  render,
  screen
} from '@testing-library/react'
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

  it('deve existir o texto "Minhas ações"', () => {
    const myActions = screen.queryByRole('heading', {
      name: /Minhas Ações/i
    })

    expect(myActions).toBeInTheDocument()
  })

  it('deve existir uma tabela itens', () => {
    const table = screen.queryByTestId('wallet-table')

    expect(table).toBeInTheDocument()
  })

  it('deve um único TR', () => {
    const emptyTable = screen.queryByTestId('wallet-table-empty')

    expect(emptyTable).toBeInTheDocument()
  })
})
