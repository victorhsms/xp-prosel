import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import actions from '../mock/actions'
import TransactionModal from '../components/transactionModal'

describe('Ao exibir o modal de transações, deve existir', () => {
  beforeEach(() => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    render(
      <RecoilRoot>
        <TransactionModal
          show={true}
          handleShow={mockHandleShow}
          action={actions[0]}
        />
      </RecoilRoot>
    )
  })

  it('Um título escrito "Comprar ação"', () => {
    const titleBuy = screen.getByText('Comprar ação')

    expect(titleBuy).toBeInTheDocument()
  })

  it('uma tabela com os headers "Ação", "Quantidade" e "Valor (R$)"', () => {
    const actionHeader = screen.queryByText('Ação')
    const quantityHeader = screen.queryByText('Quantidade')
    const valueHeader = screen.queryByText('Valor (R$)')

    expect(actionHeader).toBeInTheDocument()
    expect(quantityHeader).toBeInTheDocument()
    expect(valueHeader).toBeInTheDocument()
  })

  it('um input com o placeholder "Informe a quantidade"', () => {
    const inputQuantity = screen.queryByPlaceholderText('Informe a quantidade')

    expect(inputQuantity).toBeInTheDocument()
  })

  it('um botão escrito "Comprar"', () => {
    const btnBuy = screen.queryByRole('button', {
      name: /Comprar/i
    })

    expect(btnBuy).toBeInTheDocument()
  })

  it('um botão escrito "Fechar"', () => {
    const btnClose = screen.queryByRole('button', {
      name: /Fechar/i
    })

    expect(btnClose).toBeInTheDocument()
  })
})

describe('O modal deve ser fechado ao', () => {
  let show = true
  function mockHandleShow() {
    show = !show
  }
  beforeEach(() => {
    render(
      <RecoilRoot>
        <TransactionModal
          show={true}
          handleShow={mockHandleShow}
          action={actions[0]}
        />
      </RecoilRoot>
    )
  })

  it('clicar no botão "Fechar"', () => {
    const btnClose = screen.getByRole('button', {
      name: /Fechar/i
    })

    fireEvent.click(btnClose)

    expect(show).toBeFalsy()
  })
})

describe('Ao receber uma ação por parâmetro', () => {
  beforeEach(() => {
    let show = true
    function mockHandleShow() {
      show = !show
    }
    render(
      <RecoilRoot>
        <TransactionModal
          show={true}
          handleShow={mockHandleShow}
          action={actions[0]}
        />
      </RecoilRoot>
    )
  })

  it('Essa ação deve ser exibida na tabela do modal', () => {
    const action = screen.queryByText('XP')

    expect(action).toBeInTheDocument()
  })
})
