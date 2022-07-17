import { render, renderHook, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home from '../pages'
import { useRouter } from 'next/router'
import mockRouter from 'next-router-mock'
import actions from '../mock/actions'

jest.mock('next/router', () => require('next-router-mock'))

describe('Caso não tenha usuário logado', () => {
  beforeAll(() => {
    mockRouter.setCurrentUrl('/')
    render(
      <RecoilRoot>
        <Home actions={actions} />
      </RecoilRoot>
    )
  })

  it('o usuario deve ser redirecionado para página de Login', () => {
    const { result } = renderHook(() => {
      return useRouter()
    })

    expect(result.current).toMatchObject({ asPath: '/login' })
  })

  it('Deve ser adicionado um novo usuário no database de users do localStorage', () => {
    const data = JSON.parse(
      localStorage.getItem('users_database#xp-prosel') as string
    )

    expect(data.length).toBe(1)
    expect(data[0].email).toBe('email@email.com')
    expect(data[0].balance).toBe(0)
    expect(data[0].acions).toBe([])
  })
})
