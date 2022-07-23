import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAddUser } from '../../state/hooks/useAddUser'
import validateLogin from '../../helpers/validations/validateLogin'
import useRecouverSavedUser from '../../state/hooks/useRecouverSavedUser'
import Head from 'next/head'
import Logo from '../../components/logo'
import { FormStyle, HeaderLoginStyled } from './style'
import Footer from '../../components/footer'

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [btnStatus, setBtnStatus] = useState<boolean>(true)
  const recouverSavedUser = useRecouverSavedUser()
  const addNewUser = useAddUser()
  const router = useRouter()

  useEffect(() => {
    const hasLoggedUser = localStorage.getItem('logged_user#xp-prosel')
    if (hasLoggedUser !== null) router.replace('/')
  }, [])

  useEffect(() => {
    setBtnStatus(!validateLogin(emailValue, passwordValue))
  }, [emailValue, passwordValue])

  function updateStateAndStorage() {
    const dateNow = new Date().toLocaleString()
    localStorage.setItem(
      'logged_user#xp-prosel',
      JSON.stringify([emailValue, dateNow])
    )

    const usersStorageJson = localStorage.getItem('users_database#xp-prosel')
    if (usersStorageJson !== null) {
      const usersStorage = JSON.parse(usersStorageJson as string)
      recouverSavedUser(usersStorage, emailValue)
    }

    addNewUser(emailValue)
  }

  function setNewUser(event: React.FormEvent) {
    event.preventDefault()
    updateStateAndStorage()
    router.replace('/')
  }

  return (
    <>
      <Head>
        <title>XP Prosel - Login</title>
      </Head>
      <HeaderLoginStyled>
        <Logo />
      </HeaderLoginStyled>
      <FormStyle>
        <form onSubmit={setNewUser}>
          <h1>Login</h1>
          <div className="inputs-container">
            <div className="email-container">
              <label htmlFor="email-input">Email</label>
              <input
                type="text"
                placeholder="email@email.com"
                id="email-input"
                onChange={e => setEmailValue(e.target.value)}
              />
            </div>
            <div className="password-container">
              <label htmlFor="password-input">Senha</label>
              <input
                type="password"
                name="passowd"
                id="password-input"
                placeholder="Informe sua senha"
                onChange={e => setPasswordValue(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" disabled={btnStatus}>
            Entrar
          </button>
        </form>
      </FormStyle>
      <Footer />
    </>
  )
}
