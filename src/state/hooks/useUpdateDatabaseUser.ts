import React from 'react'
import { useRecoilValue } from 'recoil'
import IStorageUsers from '../../interface/storageUsers'
import { actionsWallet, balanceUser, loggedUser } from '../atom'

export default function useUpdateDatabaseUser() {
  const email = useRecoilValue(loggedUser)
  const balance = useRecoilValue(balanceUser)
  const actions = useRecoilValue(actionsWallet)
  const userUpdated: IStorageUsers = {
    email,
    balance,
    actions
  }

  return (storageUsers: IStorageUsers[] | null) => {
    const usersStorageJson = localStorage.getItem('users_database#xp-prosel')
    const usersStorage: IStorageUsers[] | null = JSON.parse(
      usersStorageJson as string
    )
    if (!usersStorage) return [userUpdated]

    const updatedStorageUsers = usersStorage.filter(
      user => user.email !== email.toString()
    )

    updatedStorageUsers.push(userUpdated)

    return updatedStorageUsers
  }
}
