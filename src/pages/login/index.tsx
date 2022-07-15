import { useEffect, useState } from 'react'
import validateLogin from '../../utils/validations/validateLogin'

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [btnStatus, setBtnStatus] = useState<boolean>(true)

  useEffect(() => {
    setBtnStatus(!validateLogin(emailValue, passwordValue))
  }, [emailValue, passwordValue])

  return (
    <form action="">
      <h1>Login</h1>
      <label htmlFor="email-input">Email</label>
      <input
        type="text"
        placeholder="email@email.com"
        id="email-input"
        onChange={e => setEmailValue(e.target.value)}
      />
      <label htmlFor="password-input">Senha</label>
      <input
        type="password"
        name="passowd"
        id="password-input"
        placeholder="Informe sua senha"
        onChange={e => setPasswordValue(e.target.value)}
      />
      <button disabled={btnStatus}>Entrar</button>
    </form>
  )
}
