import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { Container, Overlay, Close, Button, ButtonArea } from './styles'

import GoogleLogo from '@/assets/googleLogo.svg'
import GithubLogo from '@/assets/githubLogo.svg'

export function ModalLoad() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Container>
        <Close>
          <X />
        </Close>
        <h2>Faça login para deixar sua avaliação</h2>
        <ButtonArea>
          <Button>
            <Image src={GoogleLogo} alt="logo google" />
            <p>Entrar com Google</p>
          </Button>
          <Button>
            <Image src={GithubLogo} alt="logo github" />
            <p>Entrar com GitHub</p>
          </Button>
        </ButtonArea>
      </Container>
    </Dialog.Portal>
  )
}
