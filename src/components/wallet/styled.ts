import styled from 'styled-components'

export const WalletStyled = styled.aside`
  background-color: white;
  height: max-content;
  padding: 25px 35px 35px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 5px;

  h3 {
    font-size: 28px;
  }

  .balance-container {
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

  button {
    width: 300px;
    padding: 15px 0;
    font-weight: 500;
    background-color: #ffc709;
    cursor: pointer;
    border-radius: 5px;

    @media (max-width: 1250px) {
      width: 100%;
    }

    &:hover {
      transition: 0.4s;
      background-color: rgba(255, 199, 9, 0.7);
    }
  }

  @media (max-width: 1250px) {
    width: 100%;
    margin: 50px auto 0;
    max-width: 450px;
  }
`
