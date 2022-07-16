import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAddUser } from '../state/hooks/useAddUser'
import Header from '../components/header'
import WalletTable from '../components/walletTable'
import ActionsTable from '../components/actionsTable'
import { GetServerSideProps } from 'next'

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
      <ActionsTable />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const urlSearch = process.env.API_URL
  const result = await fetch(`${urlSearch}api/actions`)
  const actions = await result.json()
  return {
    props: {
      actions
    }
  }
}
