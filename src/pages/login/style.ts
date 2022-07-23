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

export const FormStyle = styled.form`
  margin: 150px auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  padding: 50px;
  gap: 52px;

  h1 {
    font-size: 44px;
  }

  .inputs-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .email-container,
  .password-container {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      color: #1d1f1e;
      font-weight: 700;
      font-size: 20px;
    }

    input {
      border-color: black;
      border-style: solid;
      border-width: 0 0 2.5px 0;
      padding: 10px;
      width: 400px;
      text-align: center;

      &:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
      }
    }
  }
`
