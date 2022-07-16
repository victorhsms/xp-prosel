import { render, renderHook, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home from '../pages'
import mockRouter from 'next-router-mock'
import { useRouter } from 'next/router'

jest.mock('next/router', () => require('next-router-mock'))

describe('Caso não tenha usuário logado', () => {
  beforeAll(() => {
    mockRouter.setCurrentUrl('/')
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    )
  })

  test('o usuario deve ser redirecionado para página de Login', () => {
    const { result } = renderHook(() => {
      return useRouter()
    })

    expect(result.current).toMatchObject({ asPath: '/login' })
  })
})

describe('Ao acessar a página Home, deve existir um header', () => {
  beforeAll(() => {
    const dateNow = new Date().toLocaleString()
    localStorage.setItem(
      'logged_user#xp-prosel',
      JSON.stringify(['email@email.com', dateNow])
    )
  })
  beforeEach(() =>
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    )
  )
  afterAll(() => localStorage.clear())

  test('com um link de logoff', () => {
    const logoff = screen.queryByRole('link', {
      name: /logoff/i
    })

    expect(logoff).toBeInTheDocument()
  })

  test('com um uma foto de perfil', () => {
    const imgProfile = screen.queryByAltText('Foto de perfil')

    expect(imgProfile).toBeInTheDocument()
  })
})
