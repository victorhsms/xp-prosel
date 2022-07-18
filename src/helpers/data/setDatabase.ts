import IStorageUsers from 'src/interface/storageUsers'

export default function setDatabase(users: IStorageUsers[]) {
  localStorage.setItem('users_database#xp-prosel', JSON.stringify(users))
}
