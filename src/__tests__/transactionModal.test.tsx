import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import actions from '../mock/actions'
import TransactionModal from '../components/transactionModal'
import { RecoilObserver } from '../mock/recoilObserver'
import { actionsWallet, balanceUser } from '../state/atom'

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

describe('Ao exibir o modal de transações pela carteira, deve existir também', () => {
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
          walletBuyAndSell={true}
        />
      </RecoilRoot>
    )
  })

  it('Um título escrito "Comprar ou Vender ação"', () => {
    const titleBuyOrSell = screen.queryByText('Comprar ou Vender ação')

    expect(titleBuyOrSell).toBeInTheDocument()
  })

  it('dois inputs com o placeholder "Informe a quantidade"', () => {
    const inputQuantity = screen.queryAllByPlaceholderText(
      'Informe a quantidade'
    )

    expect(inputQuantity.length).toBe(2)
  })

  it('um botão escrito "Vender"', () => {
    const btnSell = screen.queryByRole('button', {
      name: /Vender/i
    })

    expect(btnSell).toBeInTheDocument()
  })
})

describe('O modal deve ser fechado ao', () => {
  const show = true
  const mockHandleShow = jest.fn()
  beforeEach(() => {
    const initializeState = ({ set }: any) => {
      set(balanceUser, 900),
        set(actionsWallet, [
          {
            name: actions[0].name,
            quantity: 2,
            value: 450
          }
        ])
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <TransactionModal
          show={show}
          handleShow={mockHandleShow}
          action={actions[0]}
          walletBuyAndSell={true}
        />
      </RecoilRoot>
    )
  })

  afterEach(() => {
    mockHandleShow.mockClear()
  })

  it('clicar no botão "Fechar"', () => {
    const btnClose = screen.getByRole('button', {
      name: /Fechar/i
    })

    fireEvent.click(btnClose)

    expect(mockHandleShow).toHaveBeenCalled()
    expect(mockHandleShow).toHaveBeenCalledTimes(1)
  })

  it('ao pressionar a tecla ESC', () => {
    const titleBuy = screen.getByRole('heading', {
      name: /Comprar ou Vender ação/i
    })

    fireEvent.keyDown(titleBuy, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    })

    expect(mockHandleShow).toHaveBeenCalled()
    expect(mockHandleShow).toHaveBeenCalledTimes(1)
  })

  it('Ao comprar com sucesso', () => {
    const inputQuantity = screen.getAllByPlaceholderText('Informe a quantidade')

    fireEvent.change(inputQuantity[0], {
      target: {
        value: '2'
      }
    })

    const btnBuy = screen.getByRole('button', {
      name: /Comprar/i
    })

    fireEvent.click(btnBuy)

    expect(mockHandleShow).toHaveBeenCalled()
    expect(mockHandleShow).toHaveBeenCalledTimes(1)
  })

  it('Ao vender com sucesso', () => {
    const inputQuantity = screen.getAllByPlaceholderText('Informe a quantidade')

    fireEvent.change(inputQuantity[1], {
      target: {
        value: '1'
      }
    })

    const btnSell = screen.getByRole('button', {
      name: /Vender/i
    })

    fireEvent.click(btnSell)

    expect(mockHandleShow).toHaveBeenCalled()
    expect(mockHandleShow).toHaveBeenCalledTimes(1)
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
      set(balanceUser, 900)
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

    const btnBuy = screen.getByRole('button', {
      name: /Comprar/i
    })

    fireEvent.click(btnBuy)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(900)
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('as ações compradas devem ser adicionadas ao state actionswallet', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const initializeState = ({ set }: any) => {
      set(balanceUser, 1000)
      set(actionsWallet, [])
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={actionsWallet} onChange={onChange} />
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

    const btnBuy = screen.getByRole('button', {
      name: /Comprar/i
    })

    fireEvent.click(btnBuy)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenCalledWith([
      {
        name: actions[0].name,
        quantity: 2,
        value: 450
      }
    ])
  })
})

describe('Ao informar uma quantidade de ações e clicar em vender', () => {
  it('o valor total vendido deve ser adicionado ao saldo do usuário', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const testAction = [
      {
        name: actions[0].name,
        quantity: 2,
        value: 450
      }
    ]

    const initializeState = ({ set }: any) => {
      set(actionsWallet, testAction)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={balanceUser} onChange={onChange} />
        <TransactionModal
          show={show}
          handleShow={mockHandleShow}
          action={testAction[0]}
          walletBuyAndSell={true}
        />
      </RecoilRoot>
    )

    const inputQuantity = screen.getAllByPlaceholderText('Informe a quantidade')

    fireEvent.change(inputQuantity[1], {
      target: {
        value: '2'
      }
    })

    const btnSell = screen.getByRole('button', {
      name: /Vender/i
    })

    fireEvent.click(btnSell)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(0)
    expect(onChange).toHaveBeenCalledWith(900)
  })

  it('a quantidade total daquela ações deve ser subtraída no state actionswallet', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const initializeState = ({ set }: any) => {
      set(
        actionsWallet,
        [
          {
            name: actions[0].name,
            quantity: 2,
            value: 450
          }
        ],
        [
          {
            name: actions[1].name,
            quantity: 4,
            value: actions[1].value
          }
        ]
      )
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={actionsWallet} onChange={onChange} />
        <TransactionModal
          show={show}
          handleShow={mockHandleShow}
          action={actions[0]}
          walletBuyAndSell={true}
        />
      </RecoilRoot>
    )

    const inputQuantity = screen.getAllByPlaceholderText('Informe a quantidade')

    fireEvent.change(inputQuantity[1], {
      target: {
        value: '1'
      }
    })

    const btnSell = screen.getByRole('button', {
      name: /Vender/i
    })

    fireEvent.click(btnSell)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([
      {
        name: actions[0].name,
        quantity: 2,
        value: 450
      }
    ])
    expect(onChange).toHaveBeenCalledWith([
      {
        name: actions[0].name,
        quantity: 1,
        value: 450
      }
    ])
  })

  it('a ação deve ser retirada do state actionswallet se forem vendidas todas as unidades', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const testAction = [
      {
        name: actions[0].name,
        quantity: 2,
        value: 450
      }
    ]

    const initializeState = ({ set }: any) => {
      set(actionsWallet, testAction)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={actionsWallet} onChange={onChange} />
        <TransactionModal
          show={show}
          handleShow={mockHandleShow}
          action={testAction[0]}
          walletBuyAndSell={true}
        />
      </RecoilRoot>
    )

    const inputQuantity = screen.getAllByPlaceholderText('Informe a quantidade')

    fireEvent.change(inputQuantity[1], {
      target: {
        value: '2'
      }
    })

    const btnSell = screen.getByRole('button', {
      name: /Vender/i
    })

    fireEvent.click(btnSell)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([
      {
        name: actions[0].name,
        quantity: 2,
        value: 450
      }
    ])
    expect(onChange).toHaveBeenCalledWith([])
  })
})

describe('O saldo do cliente não deve ser alterado se', () => {
  it('for digitado uma quantidade maior do que ele pode comprar', () => {
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
        value: '3'
      }
    })

    const btnBuy = screen.getByRole('button', {
      name: /Comprar/i
    })

    fireEvent.click(btnBuy)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('for digitado uma quantidade negativa', () => {
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
        value: '-2'
      }
    })

    const btnBuy = screen.getByRole('button', {
      name: /Comprar/i
    })

    fireEvent.click(btnBuy)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('for digitado uma quantidade com ponto flutuante', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const initializeState = ({ set }: any) => {
      set(balanceUser, 2000)
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
        value: '2.5'
      }
    })

    const btnBuy = screen.getByRole('button', {
      name: /Comprar/i
    })

    fireEvent.click(btnBuy)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('o usuario vender mais ações do que possui', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const testAction = [
      {
        name: actions[0].name,
        quantity: 2,
        value: 450
      }
    ]

    const initializeState = ({ set }: any) => {
      set(actionsWallet, testAction)
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={actionsWallet} onChange={onChange} />
        <TransactionModal
          show={show}
          handleShow={mockHandleShow}
          action={testAction[0]}
          walletBuyAndSell={true}
        />
      </RecoilRoot>
    )

    const inputQuantity = screen.getAllByPlaceholderText('Informe a quantidade')

    fireEvent.change(inputQuantity[1], {
      target: {
        value: '4'
      }
    })

    const btnSell = screen.getByRole('button', {
      name: /Vender/i
    })

    fireEvent.click(btnSell)

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe('Ao comprar uma nova ação que ja estava na carteira', () => {
  it('essa ação deve ser exibida apenas uma vez no estado', () => {
    let show = true
    function mockHandleShow() {
      show = !show
    }

    const onChange = jest.fn()

    const initializeState = ({ set }: any) => {
      set(balanceUser, 2000)
      set(
        actionsWallet,
        [
          {
            name: actions[0].name,
            quantity: 2,
            value: 450
          }
        ],
        [
          {
            name: actions[1].name,
            quantity: 3,
            value: actions[1].value
          }
        ]
      )
    }

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={actionsWallet} onChange={onChange} />
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
        value: '3'
      }
    })

    const btnBuy = screen.getByRole('button', {
      name: /Comprar/i
    })

    fireEvent.click(btnBuy)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([
      {
        name: actions[0].name,
        quantity: 2,
        value: 450
      }
    ])
    expect(onChange).toHaveBeenCalledWith([
      {
        name: actions[0].name,
        quantity: 5,
        value: 450
      }
    ])
  })
})
