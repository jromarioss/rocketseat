import Image from 'next/image'
import {
  Container,
  CardHead,
  CardItem,
  PerfilArea,
  PerfilImage,
  ImageArea,
  StarsArea,
  BookName,
  CardItemInfo,
  PerfilInfo,
} from './styles'

import Avatar from '@/assets/Avatar.png'
import Star from '@/assets/star.svg'
import StarEmpty from '@/assets/starEmpty.svg'
import Book from '@/assets/images/Book.png'

export function Card() {
  return (
    <Container>
      <CardHead>
        <PerfilArea>
          <PerfilImage>
            <Image src={Avatar} alt="" />
          </PerfilImage>
          <PerfilInfo>
            <p>José Romário</p>
            <span>Hoje</span>
          </PerfilInfo>
        </PerfilArea>
        <StarsArea>
          <Image src={Star} alt="" />
          <Image src={Star} alt="" />
          <Image src={Star} alt="" />
          <Image src={Star} alt="" />
          <Image src={StarEmpty} alt="" />
        </StarsArea>
      </CardHead>
      <CardItem>
        <ImageArea>
          <Image src={Book} alt="" />
        </ImageArea>
        <CardItemInfo>
          <BookName>
            <p>José Romário</p>
            <span>Hoje</span>
          </BookName>
          <p>
            Semper et sapien proin vitae nisi. Feugiat neque integer donec et
            aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo
            a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed
            vulputate massa velit nibh
          </p>
        </CardItemInfo>
      </CardItem>
    </Container>
  )
}
