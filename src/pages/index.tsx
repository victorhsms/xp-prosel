import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAddUser } from '../state/hooks/useAddUser'
import Header from '../components/header'
import WalletTable from '../components/walletTable'

export default function Home() {
  const router = useRouter()
  const addUser = useAddUser()

  useEffect(() => {
    const hasLoggedUser = localStorage.getItem('logged_user#xp-prosel')
    if (!hasLoggedUser) {
      router.replace('/login')
    } else {
      addUser(JSON.parse(hasLoggedUser)[0])
    }
  }, [])

  return (
    <>
      <Header />
      <WalletTable />
    </>
  )
}
