import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import actions from '../mock/actions'
import TransactionModal from '../components/transactionModal'
import { RecoilObserver } from '../mock/recoilObserver'
import { balanceUser } from '../state/atom'

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
  const show = true
  const mockHandleShow = jest.fn()
  beforeEach(() => {
    render(
      <RecoilRoot>
        <TransactionModal
          show={show}
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

    expect(mockHandleShow).toHaveBeenCalled()
  })

  it('ao pressionar a tecla ESC', () => {
    const titleBuy = screen.getByRole('heading', {
      name: /Comprar ação/i
    })

    fireEvent.keyDown(titleBuy, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    })

    expect(mockHandleShow).toBeCalled()
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

describe('Ao informar uma quantidade de ações e clicar em comprar', () => {
  it('o total gasto deve ser retirado do saldo do usuário', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const initializeState = ({ set }: any) => {
      set(balanceUser, 1000)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={balanceUser} onChange={onChange} />
        <TransactionModal
          show={show}
          handleShow={mockHandleShow}
          action={actions[0]}
        />
      </RecoilRoot>
    )

    const inputQuantity = screen.getByPlaceholderText('Informe a quantidade')

    fireEvent.change(inputQuantity, {
      target: {
        value: '2'
      }
    })

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(1000)
    expect(onChange).toHaveBeenCalledWith(100)
  })
})
