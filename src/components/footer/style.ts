import styled from 'styled-components'

export const FooterStyled = styled.footer`
  color: white;
  font-size: 12px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 40px;
  width: 820px;
  line-height: 20px;

  .link-linkedin {
    text-decoration: underline;
    color: white;
  }

  @media (max-width: 900px) {
    width: 80%;
  }

  @media (max-width: 650px) {
    width: 95%;
  }
`
