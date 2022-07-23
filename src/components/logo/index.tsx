import Image from 'next/image'
import logotype from '../../../public/assets/logo.png'

export default function Logo() {
  return (
    <div className="logo-container">
      <div className="image-container">
        <Image
          src={logotype}
          alt="Logotipo do desafio técnico de Victor Hugo para a XP Inc"
        />
      </div>
      <span>/</span>
      <p>SONHE GRANDE</p>
    </div>
  )
}
