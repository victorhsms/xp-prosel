import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Footer from '../components/footer'
import { GlobalStyles } from '../styles/global'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  )
}
