import IStorageUsers from '../../interface/storageUsers'

export default function getDatabase(): IStorageUsers[] | null {
  const usersStorageJson = localStorage.getItem('users_database#xp-prosel')
  return JSON.parse(usersStorageJson as string)
}
