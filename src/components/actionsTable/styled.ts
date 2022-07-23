import styled from 'styled-components'

export const TableStyled = styled.div`
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
    gap: 20px;

    thead tr {
      display: flex;
      justify-content: space-between;
      background-color: rgba(83, 179, 141, 1);
      color: black;
      font-size: 20px;
      border-radius: 5px;
      padding: 12px 0;

      th {
        width: 33%;
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
        padding: 10px 0;
        background-color: rgba(255, 189, 20, 1);
        cursor: pointer;
        position: relative;

        &:hover:not(.table-empty) {
          top: -3px;
          box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.25);
        }

        th {
          font-weight: 400;
          width: 33%;
        }
      }

      .table-empty {
        background-color: white;
        font-weight: 700;
        font-size: 20px;
        cursor: default;
        flex-grow: 1;
      }
    }
  }

  @media (max-width: 1250px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 20px;
    padding: 10px 25px 20px;

    h3 {
      font-size: 24px;
    }

    thead th {
      font-size: 16px;
    }
  }

  @media (max-width: 400px) {
    thead th {
      font-size: 12px;
    }
  }
`
