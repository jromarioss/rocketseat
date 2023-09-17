import { Container } from './styles'

import Image from 'next/image'

import BookLogo from '../../../../assets/BookLogo.svg'

export function Logo() {
  return (
    <Container>
      <Image src={BookLogo} alt="Logo" />
      <h2>BookWise</h2>
    </Container>
  )
}
