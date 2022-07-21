import IStorageUsers from '../../interface/storageUsers'
import { useAddActionWallet } from './useAddActionWallet'
import { useAddBalance } from './useAddBalance'
import { useAddUser } from './useAddUser'

export default function useRecouverSavedUser() {
  const setEmail = useAddUser()
  const setBalance = useAddBalance()
  const setActions = useAddActionWallet()

  return (storageUsers: IStorageUsers[], loggedUser: string) => {
    if (loggedUser !== null) {
      const findUser = storageUsers.filter(user => (user.email = loggedUser))

      setEmail(findUser[findUser.length - 1].email)
      setBalance(findUser[findUser.length - 1].balance)
      setActions(findUser[findUser.length - 1].actions)
    }
  }
}
