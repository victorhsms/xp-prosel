import styled from 'styled-components'

export const HomeStyled = styled.main`
  display: flex;
  justify-content: center;

  .main-container {
    display: flex;
    justify-content: space-between;
    width: 80%;
    gap: 100px;

    .tables-container {
      flex-grow: 1;
      margin: 50px 0;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    @media (max-width: 1250px) {
      flex-direction: column-reverse;
      gap: 10px;
    }

    @media (max-width: 768px) {
      width: 90%;
    }
  }
`
