import { render, renderHook } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home, { getServerSideProps } from '../pages'
import { useRouter } from 'next/router'
import mockRouter from 'next-router-mock'
import actions from '../mock/actions'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { GetServerSidePropsContext } from 'next'

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
})

describe('Ao ser chamada getServerSideProps na Home', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 'success',
          message: actions
        })
    })
  ) as jest.Mock

  it('Deve ser retornado um array de ações nas props', async () => {
    const context = {
      params: { id: '' } as NextParsedUrlQuery
    }
    const response = await getServerSideProps(
      context as GetServerSidePropsContext
    )
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          actions: {
            status: 'success',
            message: actions
          }
        }
      })
    )
  })
})
