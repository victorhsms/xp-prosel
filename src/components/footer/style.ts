import styled from 'styled-components'

export const FooterStyled = styled.footer`
  background-color: white;
  font-size: 12px;
  text-align: center;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  line-height: 20px;

  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .link-linkedin {
    text-decoration: underline;
    color: black;
  }

  @media (max-width: 900px) {
    div {
      width: 80%;
    }
  }

  @media (max-width: 650px) {
    div {
      width: 90%;
    }
  }
`
