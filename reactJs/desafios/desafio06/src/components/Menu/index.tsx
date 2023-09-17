import Image from 'next/image'

import { Container, MenuButton } from './styles'

import inicioIcon from '../../assets/inicioIcon.svg'
import explorarIcon from '../../assets/explorarIcon.svg'

export function Menu() {
  return (
    <Container>
      <MenuButton>
        <Image src={inicioIcon} alt="login icon" />
        <p>Início</p>
      </MenuButton>
      <MenuButton>
        <Image src={explorarIcon} alt="login icon" />
        <p>Explorar</p>
      </MenuButton>
    </Container>
  )
}
