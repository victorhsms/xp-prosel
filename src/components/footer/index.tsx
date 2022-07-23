import Link from 'next/link'
import { FooterStyled } from './style'

export default function Footer() {
  return (
    <FooterStyled>
      <div>
        <p>
          XP Prosel é um projeto desenvolvido por{' '}
          <Link href="https://www.linkedin.com/in/victor-hugo-santos/">
            <a className="link-linkedin">Victor Hugo</a>
          </Link>{' '}
          para o processo seletivo da XP Inc. O projeto e layout não tem
          qualquer relação com a financeira XP Inc.
        </p>
        <p>Projeto desenvolvido com Nexjs, Recoil e Styled-Component</p>
      </div>
    </FooterStyled>
  )
}
