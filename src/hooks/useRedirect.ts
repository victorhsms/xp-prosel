import { useRouter } from 'next/router'

export default function useRedirect() {
  const router = useRouter()
  return (path: string) => {
    return router.replace(path)
  }
}
