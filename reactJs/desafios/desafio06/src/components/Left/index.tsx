import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'

import { Container, LoginArea } from './styles'

import { Logo } from './components/Logo'
import { Menu } from '../Menu'

import LoginImg from '@/assets/login.svg'
import { ModalLoad } from '../ModalLoad'

export function Left() {
  return (
    <Container>
      <Logo />
      <Menu />
      <LoginArea>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <p>Edit profile</p>
          </Dialog.Trigger>

          <ModalLoad />
        </Dialog.Root>

        <Image src={LoginImg} alt="login icon" />
      </LoginArea>
    </Container>
  )
}
