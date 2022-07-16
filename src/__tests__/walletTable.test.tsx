import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home from '../pages'

describe('Ao entrar na página de login', () => {
  test('deve existir o texto "Minhas ações"', () => {
    beforeEach(() => {
      render(
        <RecoilRoot>
          <Home />
        </RecoilRoot>
      )
    })

    const myActions = screen.queryByRole('heading', {
      name: 'Minhas Ações'
    })

    expect(myActions).toBeInTheDocument()
  })
})
