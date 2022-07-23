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
    }
  }
`
