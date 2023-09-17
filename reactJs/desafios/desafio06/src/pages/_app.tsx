import { AppProps } from 'next/app'
import { Nunito } from 'next/font/google'

import { globalStyles } from '@/styles/global'

const nunito = Nunito({ subsets: ['latin'] })

export default function App({ Component }: AppProps) {
  globalStyles()

  return (
    <>
      <div className={nunito.className}>
        <Component />
      </div>
    </>
  )
}
