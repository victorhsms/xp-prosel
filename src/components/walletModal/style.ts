import styled from 'styled-components'

interface PropsModal {
  deposit: boolean
  withdraw: boolean
}

const ModalStyled = styled.div<PropsModal>`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 750px) {
    gap: 30px;
  }

  .balance-modal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 400;

    .balance-quantity {
      font-weight: 700;
      font-size: 24px;
      color: forestgreen;
    }
  }

  .wallet-modal-buttons-operations {
    display: flex;
    justify-content: space-around;

    button {
      padding: 15px 35px;
      border-radius: 5px;
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;

      &:disabled {
        background-color: grey;
        cursor: default;
        box-shadow: none;
      }
    }

    .select-operation-deposit {
      background-color: ${props =>
        props.deposit ? '#ffc709' : 'rgba(255, 189, 20, 0.2)'};
      box-shadow: ${props =>
        props.deposit ? '-4px 4px 8px rgba(0, 0, 0, 0.25)' : 'none'};
    }

    .select-operation-withdraw {
      background-color: ${props =>
        props.withdraw ? '#ffc709' : 'rgba(255, 189, 20, 0.2)'};
      box-shadow: ${props =>
        props.withdraw ? '-4px 4px 8px rgba(0, 0, 0, 0.25)' : 'none'};
    }

    @media (max-width: 750px) {
      button {
        padding: 5px 15px;
      }
    }
  }

  input {
    border-color: black;
    border-style: solid;
    border-width: 0 0 2.5px 0;
    padding: 10px;
    width: 100%;
    text-align: center;

    &:focus {
      box-shadow: 0 0 0 0;
      outline: 0;
    }
  }

  .wallet-modal-buttons {
    display: flex;
    justify-content: space-between;

    button {
      background-color: #252822;
      padding: 15px 35px;
      border-radius: 5px;
      color: white;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.25);
        transition: 0.3s;
      }
    }
    @media (max-width: 750px) {
      justify-content: space-around;
      button {
        padding: 5px 15px;
      }
    }

    .button-confirme {
      background-color: rgba(83, 179, 141, 1);

      &:disabled {
        background-color: #eee;
        box-shadow: none;
        cursor: default;
      }
    }
  }

  .infos {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    h4 {
      font-size: 20px;
    }

    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @media (max-width: 570px) {
      font-size: 14px;

      h4 {
        font-size: 16px;
      }
    }
  }
`

export default ModalStyled
