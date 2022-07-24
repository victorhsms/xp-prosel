import styled from 'styled-components'

export const ModalTransactionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  h1 {
    font-size: 30px;

    @media (max-width: 500px) {
      font-size: 24px;
    }
  }

  table {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    thead tr {
      display: flex;
      justify-content: space-between;
      background-color: rgba(83, 179, 141, 1);
      color: black;
      font-size: 16px;
      border-radius: 5px;
      padding: 4px 0;

      th {
        width: 33%;
        font-weight: 400;
      }
    }

    tbody {
      display: flex;
      flex-direction: column;
      gap: 20px;

      tr {
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
        padding: 6px 0;
        background-color: rgba(255, 189, 20, 1);

        th {
          width: 33%;
        }
      }
    }
  }

  .input-transaction-modal {
    display: flex;

    input {
      border-color: #252822;
      border-style: solid;
      border-width: 0 0 3px 0;
      padding: 10px;
      width: 100%;
      text-align: center;

      &:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
      }
    }

    button {
      background-color: #252822;
      padding: 15px 25px;
      border-radius: 0 5px 5px 0;
      color: white;
      font-weight: 700;
      cursor: pointer;

      @media (max-width: 500px) {
        padding: 10px 12px;
      }

      &:hover {
        box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.25);
        transition: 0.3s;
      }
    }
    .sell-button {
      padding: 15px 32px;

      @media (max-width: 500px) {
        padding: 10px 18px;
      }
    }
  }

  .close-button {
    background-color: #252822;
    padding: 15px 25px;
    border-radius: 5px;
    color: white;
    font-weight: 700;
    width: 50%;
    cursor: pointer;

    &:hover {
      box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.25);
      transition: 0.3s;
    }

    @media (max-width: 500px) {
      padding: 10px 12px;
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
