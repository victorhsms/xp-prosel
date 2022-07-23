import Link from 'next/link'
import { FooterStyled } from './style'

export default function Footer() {
  return (
    <FooterStyled>
      <p>
        XP Prosel é um projeto que foi desenvolvido por{' '}
        <Link href="https://www.linkedin.com/in/victor-hugo-santos/">
          <a>Victor Hugo</a>
        </Link>{' '}
        como desafio técnico para o processo seletivo da XP Inc para a Turma XP,
        da Trybe. O projeto e layout não tem qualquer relação com a financeira
        XP Inc.
      </p>
    </FooterStyled>
  )
}
