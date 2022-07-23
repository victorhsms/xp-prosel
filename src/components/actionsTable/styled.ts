import styled from 'styled-components'

export const ActionsTableStyled = styled.div`
  background-color: white;
  padding: 25px 40px 35px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  border-radius: 5px;

  h3 {
    font-size: 30px;
  }

  table {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    thead tr {
      display: flex;
      justify-content: space-between;
      background-color: royalblue;
      color: black;
      font-size: 20px;
      border-radius: 5px;
      padding: 8px 0;

      th {
        width: 25%;
      }
    }

    tbody {
      display: flex;
      flex-direction: column;
      gap: 10px;

      tr {
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
        padding: 5px 0;
        background-color: rgba(83, 179, 141, 1);
        font-weight: 400;

        th {
          width: 25%;
        }
      }
    }
  }
`
