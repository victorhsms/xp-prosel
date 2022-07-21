import { fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import React from 'react'
import Login from '../../pages/login'
import { RecoilObserver } from '../../mock/recoilObserver'
import { balanceUser } from '../../state/atom'

jest.mock('next/router', () => require('next-router-mock'))

describe('Ao existir um email no userStorage com o email logado', () => {
  it('O estado deve ser atualizado para os dados do userStorage', () => {
    const onChange = jest.fn()
    render(
      <RecoilRoot>
        <RecoilObserver node={balanceUser} onChange={onChange} />
        <Login />
      </RecoilRoot>
    )
    localStorage.setItem(
      'users_database#xp-prosel',
      JSON.stringify([{ email: 'email@email.com', balance: 100, actions: [] }])
    )

    const loginBtn = screen.getByRole('button', {
      name: /Entrar/i
    })

    const emailInput = screen.getByPlaceholderText('email@email.com')
    const passwordInput = screen.getByPlaceholderText('Informe sua senha')

    fireEvent.change(emailInput, {
      target: {
        value: 'email@email.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123456'
      }
    })

    fireEvent.click(loginBtn)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(0)
    expect(onChange).toHaveBeenCalledWith(100)
  })
})
