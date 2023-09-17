import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'

import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header /> {/* O header vai se repetir para todos */}
      <Outlet /> {/* E aqui vai o conteúdo da página */}
    </LayoutContainer>
  )
}
