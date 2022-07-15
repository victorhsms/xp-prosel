import { GetServerSideProps } from 'next'

export default function Home() {
  return <h1>Página inicial</h1>
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/login',
      permanent: true
    }
  }
}
