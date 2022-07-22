import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { actionsWallet } from '../state/atom'
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

  it('deve existir o texto "Minhas ações"', () => {
    const myActions = screen.queryByRole('heading', {
      name: /Minhas Ações/i
    })

    expect(myActions).toBeInTheDocument()
  })

  it('deve existir uma tabela', () => {
    const table = screen.queryByTestId('wallet-table')

    expect(table).toBeInTheDocument()
  })

  it('deve existir 4 theads na tabela', () => {
    const name = screen.queryByTestId('actions-wallet-table')
    const quantity = screen.queryByTestId('quantity-wallet-table')
    const value = screen.queryByTestId('value-wallet-table')
    const negotiate = screen.queryByTestId('negotiate-wallet-table')

    expect(name).toBeInTheDocument()
    expect(quantity).toBeInTheDocument()
    expect(value).toBeInTheDocument()
    expect(negotiate).toBeInTheDocument()
  })
})

describe('Ao acessar a página de login com um novo usuário', () => {
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

  it('deve um único TR indicando tabela vazia', () => {
    const emptyTable = screen.queryByTestId('wallet-table-empty')

    expect(emptyTable).toBeInTheDocument()
  })
})

describe('Deverá ser exibida uma action na tabela', () => {
  it('ao existir uma action no estado actionswallet', () => {
    const initializeState = ({ set }: any) => {
      set(actionsWallet, [
        {
          name: actions[0].name,
          quantity: 2,
          value: 450
        }
      ])
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <Home actions={actions} />
      </RecoilRoot>
    )

    const firstActionName = screen.getByTestId('XP-name-wallet-table')
    const firstActionQuantity = screen.getByTestId('XP-quantity-wallet-table')
    const firstActionValue = screen.getByTestId('XP-value-wallet-table')

    expect(firstActionName).toBeInTheDocument()
    expect(firstActionQuantity).toBeInTheDocument()
    expect(firstActionValue).toBeInTheDocument()
    expect(firstActionName.textContent).toBe('XP')
    expect(firstActionQuantity.textContent).toBe('2')
    expect(firstActionValue.textContent).toBe('450')
  })
})

describe('Ao clicar em uma action na tabela', () => {
  it('deverá ser exibido um modal com o título "Comprar ou Vender ação"', () => {
    const initializeState = ({ set }: any) => {
      set(actionsWallet, [
        {
          name: actions[0].name,
          quantity: 2,
          value: 450
        }
      ])
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <Home actions={actions} />
      </RecoilRoot>
    )

    const firstAction = screen.getByTestId('XP-action-wallet-table')

    fireEvent.click(firstAction)

    const titleBuyOrSell = screen.queryByText('Comprar ou Vender ação')

    expect(titleBuyOrSell).toBeInTheDocument()
  })
})
