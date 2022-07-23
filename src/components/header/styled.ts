import styled from 'styled-components'

export const HeaderStyled = styled.header`
  background-color: white;
  display: flex;
  justify-content: center;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;

    .logo-container {
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

    .profile {
      display: flex;
      align-items: center;
      gap: 30px;

      span {
        font-weight: 500;
        font-size: 18px;
        text-decoration: underline;
      }

      img {
        width: 45px;
        border-radius: 40px;
      }
    }
  }
`
