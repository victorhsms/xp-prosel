import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import TransactionModal from '../components/transactionModal'

describe('Ao exibir o modal de transações, deve existir', () => {
  beforeEach(() => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    render(
      <RecoilRoot>
        <TransactionModal show={true} handleShow={mockHandleShow} />
      </RecoilRoot>
    )
  })

  it('Um título escrito "Comprar ação"', () => {
    const titleBuy = screen.getByText('Comprar ação')

    expect(titleBuy).toBeInTheDocument()
  })

  it('uma tabela com os headers "ação", "quantidade" e "valor"', () => {
    const actionHeader = screen.queryByText('Ação')
    const quantityHeader = screen.queryByText('Quantidade')
    const valueHeader = screen.queryByText('Valor')

    expect(actionHeader).toBeInTheDocument()
    expect(quantityHeader).toBeInTheDocument()
    expect(valueHeader).toBeInTheDocument()
  })

  it('um input com o placeholder "Informe a quantidade"', () => {
    const inputQuantity = screen.queryByPlaceholderText('Informe um valor')

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
