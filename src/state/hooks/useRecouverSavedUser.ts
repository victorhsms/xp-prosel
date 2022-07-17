import IStorageUsers from 'src/interface/storageUsers'
import { useAddBalance } from './useAddBalance'
import { useAddUser } from './useAddUser'

export default function useRecouverSavedUser() {
  const setEmail = useAddUser()
  const setBalance = useAddBalance()

  return (storageUsers: IStorageUsers[], loggedUser: string) => {
    if (loggedUser !== null) {
      const findUser = storageUsers.filter(user => (user.email = loggedUser))

      setEmail(findUser[findUser.length - 1].email)
      setBalance(findUser[findUser.length - 1].balance)
    }
  }
}
