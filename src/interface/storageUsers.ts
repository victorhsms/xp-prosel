import IActions from './action'

interface IStorageUsers {
  email: string
  balance: number
  actions: IActions[] | []
}

export default IStorageUsers
