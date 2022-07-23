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
