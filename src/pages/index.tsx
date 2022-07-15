import { GetServerSideProps } from 'next'

export default function Home() {
  return (
    <div>
      <h1>Portfolio</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/login',
      permanent: true
    }
  }
}
