import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const hasLoggedUser = localStorage.getItem('logged_user#xp-prosel')

    if (!hasLoggedUser) {
      router.replace('/login')
    }
  }, [])

  return <h1>Página inicial</h1>
}
