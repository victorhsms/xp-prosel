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
    if (!storageUsers) return [userUpdated]

    const updatedStorageUsers = storageUsers.filter(
      user => user.email !== email.toString()
    )
    updatedStorageUsers.push(userUpdated)

    return updatedStorageUsers
  }
}
