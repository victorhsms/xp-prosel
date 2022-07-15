import Login from '../pages/login'
import { fireEvent, render, screen } from '@testing-library/react'
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

  test('Deve existir um botão de login', () => {
    const loginBtn = screen.queryByRole('button', {
      name: /Entrar/i
    })

    expect(loginBtn).toBeInTheDocument()
  })

  test('O botão de login deve estar desabilitado', () => {
    const loginBtn = screen.queryByRole('button', {
      name: /Entrar/i
    })

    expect(loginBtn).toBeDisabled()
  })
})

describe('O botão deve ficar continuar desabilitado', () => {
  beforeEach(() => render(<Login />))

  test('Ao informar email e senha inválidos', () => {
    const loginBtn = screen.queryByRole('button', {
      name: /Entrar/i
    })

    const emailInput = screen.getByPlaceholderText('email@email.com')
    const passwordInput = screen.getByPlaceholderText('Informe sua senha')

    fireEvent.change(emailInput, {
      target: {
        value: 'email@email'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })

    expect(loginBtn).toBeDisabled()
  })

  test('Ao informar email válido, mas senha inválida', () => {
    const loginBtn = screen.queryByRole('button', {
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
        value: '123'
      }
    })

    expect(loginBtn).toBeDisabled()
  })

  test('Ao informar senha válida, mas email inválido', () => {
    const loginBtn = screen.queryByRole('button', {
      name: /Entrar/i
    })

    const emailInput = screen.getByPlaceholderText('email@email.com')
    const passwordInput = screen.getByPlaceholderText('Informe sua senha')

    fireEvent.change(emailInput, {
      target: {
        value: 'email@email'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123456'
      }
    })

    expect(loginBtn).toBeDisabled()
  })

  test('Ao informar dados válidos, mas depois mudar para inválidos', () => {
    const loginBtn = screen.queryByRole('button', {
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

    expect(loginBtn).toBeEnabled()

    fireEvent.change(emailInput, {
      target: {
        value: 'email@email'
      }
    })

    expect(loginBtn).toBeDisabled()
  })
})

describe('O botão deve ser ficar habilitado', () => {
  test('Ao informar um email e senha válidos', () => {
    render(<Login />)

    const loginBtn = screen.queryByRole('button', {
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

    expect(loginBtn).toBeEnabled()
  })
})

describe('Ao clicar no botão de login', () => {
  const originalDate = global.Date

  beforeEach(() => render(<Login />))
  afterEach(() => {
    global.Date = originalDate

    localStorage.clear('logged_user')
  })

  test('O email e a data atual devem ser salvos no localhost', () => {
    global.Date.now = jest.fn(() => new Date('15/07/2022 18:42:05').getTime())

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

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'logged_user',
      JSON.stringify(['email@email.com', '15/07/2022 18:42:05'])
    )
  })
})
