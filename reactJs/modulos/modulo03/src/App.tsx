import { ThemeProvider } from 'styled-components'

import { Transactions } from './pages/Transactions'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/defaults'
import { TransactionContextProvider } from './context/transactionsContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionContextProvider>
        <Transactions />
      </TransactionContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
