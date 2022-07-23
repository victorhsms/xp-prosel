import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { GlobalStyles } from '../styles/global'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
