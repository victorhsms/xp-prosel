import styled from 'styled-components'

export const HeaderLoginStyled = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;

  div {
    display: flex;
    align-items: center;
    gap: 25px;
    font-weight: 300;

    .image-container {
      width: 180px;
    }

    span {
      font-size: 40px;
      padding: 5px 0 0 10px;
    }

    p {
      font-size: 25px;
      padding-top: 5px;
    }

    @media (max-width: 550px) {
      span,
      p {
        display: none;
      }
    }
  }
`

export const FormStyle = styled.main`
  display: flex;
  padding: 150px 0;
  justify-content: center;

  form {
    max-width: 700px;
    width: 85%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    gap: 60px;

    h1 {
      font-size: 44px;
    }

    .inputs-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
      width: 100%;
    }
    .email-container,
    .password-container {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        color: #1d1f1e;
        font-weight: 700;
        font-size: 24px;
      }

      input {
        border-color: black;
        border-style: solid;
        border-width: 0 0 2.5px 0;
        padding: 10px;
        width: 100%;
        text-align: center;
        font-size: 20px;

        &:focus {
          box-shadow: 0 0 0 0;
          outline: 0;
        }
      }
    }

    button {
      width: 100%;
      padding: 15px 0;
      font-weight: 700;
      background-color: #ffc709;
      cursor: pointer;

      &:hover {
        transition: 0.4s;
        background-color: rgba(255, 199, 9, 0.7);
      }

      &:disabled {
        transition: 0.5s;
        color: black;
        background-color: #eeeeee;
        cursor: default;
      }
    }
  }

  @media (max-width: 500px) {
    form {
      padding: 20px;

      h1 {
        font-size: 36px;
      }
    }
  }
`
