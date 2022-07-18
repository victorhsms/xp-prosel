import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAddUser } from '../state/hooks/useAddUser'
import Header from '../components/header'
import WalletTable from '../components/walletTable'
import ActionsTable from '../components/actionsTable'
import { GetServerSideProps } from 'next'
import { useAddActionStore } from '../state/hooks/useAddActionStore'
import IActions from '../interface/action'
import { server } from '../config'
import Wallet from '../components/wallet'
import { useRecoilValue } from 'recoil'
import { actionsWallet, balanceUser, loggedUser } from '../state/atom'
import useUpdateDatabaseUser from '../state/hooks/useUpdateDatabaseUser'

export default function Home({ actions }: { actions: IActions[] }) {
  const email = useRecoilValue(loggedUser)
  const balance = useRecoilValue(balanceUser)
  const AllActions = useRecoilValue(actionsWallet)
  const updateUserToDatabase = useUpdateDatabaseUser()
  const router = useRouter()
  const addUser = useAddUser()
  const addActionsStore = useAddActionStore()

  useEffect(() => {
    updateUserToDatabase()
  }, [email, balance, AllActions])

  useEffect(() => {
    const hasLoggedUser = localStorage.getItem('logged_user#xp-prosel')
    if (!hasLoggedUser) {
      router.replace('/login')
    } else {
      addUser(JSON.parse(hasLoggedUser)[0])
      addActionsStore(actions)
    }
  }, [])

  return (
    <>
      <Header />
      <WalletTable />
      <ActionsTable />
      <Wallet />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const urlSearch = `${server}/api/actions`
  const result = await fetch(urlSearch)
  const actions = await result.json()
  return {
    props: {
      actions
    }
  }
}
