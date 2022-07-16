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
