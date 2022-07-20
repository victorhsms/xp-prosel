import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import TransactionModal from '../components/transactionModal'

describe('Ao exibir o modal de transações, deve existir', () => {
  beforeEach(() => {
    let show = false
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
    const titleBuy = screen.queryByRole('heading', {
      name: /Comprar ação/i
    })

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
})
