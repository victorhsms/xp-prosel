import Login from '../pages/login'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Ao acessar a página de login', () => {
  beforeEach(() => {
    render(<Login />)
  })

  test('Deve existir um título escrito "Login"', () => {
    const login = screen.queryByRole('heading', {
      name: /Login/i
    })

    expect(login).toBeInTheDocument()
  })

  test('Deve existir um input de email', () => {
    const emailInput = screen.queryByPlaceholderText('email@email.com')

    expect(emailInput).toBeInTheDocument()
  })
})
