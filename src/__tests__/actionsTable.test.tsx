import { render, screen } from '@testing-library/react'
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

describe('Ao entrar na página home com um usuário novo', () => {
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

  it('deve aparecer uma lista de ações na tabela', () => {
    actions.map(action => {
      const tableItem = screen.queryByTestId(`${action.name}-name-table`)

      expect(tableItem).toBeInTheDocument()
    })
  })
})
