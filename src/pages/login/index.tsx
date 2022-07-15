import useRedirect from '../../hooks/useRedirect'
import React, { useEffect, useState } from 'react'
import validateLogin from '../../helpers/validations/validateLogin'

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [btnStatus, setBtnStatus] = useState<boolean>(true)
  const redirect = useRedirect()

  useEffect(() => {
    setBtnStatus(!validateLogin(emailValue, passwordValue))
  }, [emailValue, passwordValue])

  function setNewUser(event: React.FormEvent) {
    event.preventDefault()

    const dateNow = new Date().toLocaleString()

    localStorage.setItem('logged_user', JSON.stringify([emailValue, dateNow]))

    redirect('/')
  }

  return (
    <form onSubmit={setNewUser}>
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
      <button type="submit" disabled={btnStatus}>
        Entrar
      </button>
    </form>
  )
}
