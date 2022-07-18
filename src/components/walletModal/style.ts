import styled from 'styled-components'

interface PropsModal {
  deposit: boolean
  withdraw: boolean
}

const ModalStyled = styled.div<PropsModal>`
  .select-operation-deposit {
    background-color: ${props => (props.deposit ? 'green' : 'red')};
  }

  .select-operation-withdraw {
    background-color: ${props => (props.withdraw ? 'green' : 'red')};
  }
`

export default ModalStyled
