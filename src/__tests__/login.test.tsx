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

  test('Deve existir uma label pra o email', () => {
    const labelEmail = screen.queryByLabelText('Email')

    expect(labelEmail).toBeInTheDocument()
  })

  test('Deve existir um input de email', () => {
    const emailInput = screen.queryByPlaceholderText('email@email.com')

    expect(emailInput).toBeInTheDocument()
  })

  test('Deve existir uma label para a senha', () => {
    const passordLabel = screen.queryByLabelText('Senha')

    expect(passordLabel).toBeInTheDocument()
  })

  test('Deve existir um input de senha', () => {
    const passwordInput = screen.queryByPlaceholderText('Informe sua senha')

    expect(passwordInput).toBeInTheDocument()
  })
})
