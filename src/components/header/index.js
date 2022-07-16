import React from 'react'
import md5 from 'crypto-js/md5'

export default function Header() {
  function getGravatar() {
    const userLogged = JSON.parse(
      window.localStorage.getItem('logged_user#xp-prosel')
    )[0]
    const hashGenerated = md5(userLogged).toString()
    const gravatar = `https://www.gravatar.com/avatar/${hashGenerated}`
    return gravatar
  }

  return (
    <header>
      <div>
        <span role="link">logoff</span>
        <img src={getGravatar()} alt="Foto de perfil" width={50} height={50} />
      </div>
    </header>
  )
}
