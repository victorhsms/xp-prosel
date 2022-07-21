import Login from '../pages/login'
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import React from 'react'
import mockRouter from 'next-router-mock'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'

jest.mock('next/router', () => require('next-router-mock'))

describe('Caso ja tenha um usuário logado', () => {
  beforeAll(() => {
    const dateNow = new Date().toLocaleString()
    localStorage.setItem(
      'logged_user#xp-prosel',
      JSON.stringify(['email@email.com', dateNow])
    )
  })

  it('o usuario deve ser redirecionado para a Home', () => {
    mockRouter.setCurrentUrl('/login')
    render(
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    )

    const { result } = renderHook(() => {
      return useRouter()
    })

    expect(result.current).toMatchObject({ asPath: '/' })
  })
})

describe('Ao acessar a página de login', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    )
  })

  it('Deve existir um título escrito "Login"', () => {
    const login = screen.queryByRole('heading', {
      name: /Login/i
    })

    expect(login).toBeInTheDocument()
  })

  it('Deve existir uma label pra o email', () => {
    const labelEmail = screen.queryByLabelText('Email')

    expect(labelEmail).toBeInTheDocument()
  })

  it('Deve existir um input de email', () => {
    const emailInput = screen.queryByPlaceholderText('email@email.com')

    expect(emailInput).toBeInTheDocument()
  })

  it('Deve existir uma label para a senha', () => {
    const passordLabel = screen.queryByLabelText('Senha')

    expect(passordLabel).toBeInTheDocument()
  })

  it('Deve existir um input de senha', () => {
    const passwordInput = screen.queryByPlaceholderText('Informe sua senha')

    expect(passwordInput).toBeInTheDocument()
  })

  it('Deve existir um botão de login', () => {
    const loginBtn = screen.queryByRole('button', {
      name: /Entrar/i
    })

    expect(loginBtn).toBeInTheDocument()
  })

  it('O botão de login deve estar desabilitado', () => {
    const loginBtn = screen.queryByRole('button', {
      name: /Entrar/i
    })

    expect(loginBtn).toBeDisabled()
  })
})

describe('O botão deve ficar continuar desabilitado', () => {
  beforeEach(() =>
    render(
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    )
  )

  it('Ao informar email e senha inválidos', () => {
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

  it('Ao informar email válido, mas senha inválida', () => {
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

  it('Ao informar senha válida, mas email inválido', () => {
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

  it('Ao informar dados válidos, mas depois mudar para inválidos', () => {
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
  it('Ao informar um email e senha válidos', () => {
    render(
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    )

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
  beforeEach(() => {
    mockRouter.setCurrentUrl('/login')
    render(
      <RecoilRoot>
        <Login />
      </RecoilRoot>
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
  })

  it('O email e a data atual devem ser salvos no localStorage', () => {
    const data = JSON.parse(
      localStorage.getItem('logged_user#xp-prosel') as string
    )

    expect(data.length).toBe(2)
    expect(data[0]).toBe('email@email.com')
    expect(data[1]).toBe(new Date().toLocaleString())
  })
})
