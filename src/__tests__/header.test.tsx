import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home from '../pages'
import mockRouter from 'next-router-mock'
import { useRouter } from 'next/router'

jest.mock('next/router', () => require('next-router-mock'))

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

  it('com um link de logoff', () => {
    const logoff = screen.queryByRole('link', {
      name: /logoff/i
    })

    expect(logoff).toBeInTheDocument()
  })

  it('com um uma foto de perfil', () => {
    const imgProfile = screen.queryByAltText('Foto de perfil')

    expect(imgProfile).toBeInTheDocument()
  })
})

describe('Ao clicar no link de logoff', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/')

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

  it('o usuário não deve mais existir no localStorage', () => {
    const logoff = screen.getByRole('link', {
      name: /logoff/i
    })

    fireEvent.click(logoff)

    const userLogged = localStorage.getItem('logged_user#xp-prosel')

    expect(userLogged).toBeNull()
  })

  it('o usuário é redirecionado para página de login', () => {
    const { result } = renderHook(() => {
      return useRouter()
    })

    const logoff = screen.getByRole('link', {
      name: /logoff/i
    })

    fireEvent.click(logoff)

    expect(result.current).toMatchObject({ asPath: '/login' })
  })
})
