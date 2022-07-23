import { useRecoilValue } from 'recoil'
import setDatabase from '../../helpers/data/setDatabase'
import getDatabase from '../../helpers/data/getDatabase'
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

  return () => {
    const usersStorage = getDatabase()
    if (!usersStorage) return setDatabase([userUpdated])
    const updatedStorageUsers = usersStorage.filter(
      user => user.email !== email.toString()
    )
    updatedStorageUsers.push(userUpdated)

    if (email !== '') setDatabase(updatedStorageUsers)
  }
}
