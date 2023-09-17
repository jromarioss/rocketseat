import Image from 'next/image'

import { Container, CardItem, InfoTitle, StarsArea } from './styles'

import Star from '../../assets/star.svg'
import StarEmpty from '../../assets/starEmpty.svg'
import Book from '../../assets/images/Book.png'

export function CardPopular() {
  return (
    <Container>
      <Image src={Book} alt="" width={64} />
      <CardItem>
        <InfoTitle>
          <p>A revolução dos bichos</p>
          <span>George Orwell</span>
        </InfoTitle>
        <StarsArea>
          <Image src={Star} alt="" />
          <Image src={Star} alt="" />
          <Image src={Star} alt="" />
          <Image src={Star} alt="" />
          <Image src={StarEmpty} alt="" />
        </StarsArea>
      </CardItem>
    </Container>
  )
}
