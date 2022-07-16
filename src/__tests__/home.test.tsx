import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home from '../pages'

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
