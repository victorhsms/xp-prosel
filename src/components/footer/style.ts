import styled from 'styled-components'

export const FooterStyled = styled.footer`
  background-color: white;
  font-size: 12px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 0;

  line-height: 20px;

  .link-linkedin {
    text-decoration: underline;
    color: black;
  }

  @media (max-width: 900px) {
    width: 80%;
  }

  @media (max-width: 650px) {
    width: 95%;
  }
`
