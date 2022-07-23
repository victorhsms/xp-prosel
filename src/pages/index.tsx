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
import useUpdateDatabaseUser from '../state/hooks/useUpdateDatabaseUser'
import Head from 'next/head'
import Footer from '../components/footer'
import { HomeStyled } from './style'

export default function Home({ actions }: { actions: IActions[] }) {
  const updateUserToDatabase = useUpdateDatabaseUser()
  const router = useRouter()
  const addUser = useAddUser()
  const addActionsStore = useAddActionStore()

  useEffect(() => {
    updateUserToDatabase()
  }, [])

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
      <Head>
        <title>XP Prosel</title>
      </Head>
      <Header />
      <HomeStyled>
        <div className="main-container">
          <div className="tables-container">
            <WalletTable />
            <ActionsTable />
          </div>
          <Wallet />
        </div>
      </HomeStyled>
      <Footer />
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
