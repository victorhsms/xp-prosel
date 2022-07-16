import React from 'react'
import md5 from 'crypto-js/md5'
import { useUser } from '../../state/hooks/useUser'

export default function Header() {
  const user = useUser()
  function getGravatar() {
    const hashGenerated = md5(user).toString()
    const gravatar = `https://www.gravatar.com/avatar/${hashGenerated}`
    return gravatar
  }

  return (
    <header>
      <div>
        <span role="link">logoff</span>
        <img src={getGravatar()} alt="Foto de perfil" />
      </div>
    </header>
  )
}
