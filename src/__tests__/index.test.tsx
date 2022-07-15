import { render, screen } from '@testing-library/react'

import Home from '../pages'

describe('Ao acessar a página Home', () => {
  it('o usuário deve ser redirecionado para a página de login', () => {
    render(<Home />)

    const heading = screen.queryByRole('heading', {
      name: /login/i
    })

    expect(heading).toBeInTheDocument()
  })
})
