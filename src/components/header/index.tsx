import React from 'react'
import md5 from 'crypto-js/md5'
import { useAddUser } from '../../state/hooks/useAddUser'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { loggedUser } from '../../state/atom'

export default function Header() {
  const router = useRouter()
  const user = useRecoilValue(loggedUser)
  const addUser = useAddUser()

  function getGravatar() {
    const hashGenerated = md5(user).toString()
    return `https://www.gravatar.com/avatar/${hashGenerated}`
  }

  function logoff() {
    localStorage.removeItem('logged_user#xp-prosel')
    addUser('')

    router.replace('/login')
  }

  return (
    <header>
      <div>
        <span role="link" onClick={logoff}>
          logoff
        </span>
        <img src={getGravatar()} alt="Foto de perfil" />
      </div>
    </header>
  )
}
