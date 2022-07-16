import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Header from '../components/header'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const hasLoggedUser = localStorage.getItem('logged_user#xp-prosel')
    if (!hasLoggedUser) router.replace('/login')
  }, [])

  return <Header />
}
