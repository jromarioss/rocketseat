import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'

import {
  Container,
  Right,
  Cards,
  CardArea,
  RightInsideLogo,
  Logo,
  StarsArea,
  CardItem,
  InfoTitle,
  ButtonArea,
} from './styles'

import { Books } from '../../datas/books'
import { Left } from '@/components/Left'
import { SearchForm } from './components/SearchForm'

import Star from '@/assets/star.svg'
import StarEmpty from '@/assets/starEmpty.svg'
import explorarIcon from '@/assets/explorarIcon.svg'
import { ModalBookInfo } from './components/ModalBookInfo'

export default function home() {
  return (
    <Container>
      <Left />

      <Right>
        <RightInsideLogo>
          <Logo>
            <Image src={explorarIcon} alt="" width={32} />
            <h2>Explorar</h2>
          </Logo>

          <SearchForm />
        </RightInsideLogo>

        <ButtonArea>
          <button>Tudo</button>
          <button>Computação</button>
          <button>Educação</button>
          <button>Fantasia</button>
          <button>Ficção científica</button>
          <button>Horror</button>
          <button>HQs</button>
          <button>Suspense</button>
        </ButtonArea>

        <CardArea>
          {Books.map((book) => {
            return (
              <Dialog.Root key={book.id}>
                <Dialog.Trigger asChild>
                  <Cards>
                    <Image src={book.imageUrl} alt="" width={108} />
                    <CardItem>
                      <InfoTitle>
                        <p>{book.title}</p>
                        <span>{book.author}</span>
                      </InfoTitle>
                      <StarsArea>
                        <Image src={Star} alt="" />
                        <Image src={Star} alt="" />
                        <Image src={Star} alt="" />
                        <Image src={Star} alt="" />
                        <Image src={StarEmpty} alt="" />
                      </StarsArea>
                    </CardItem>
                  </Cards>
                </Dialog.Trigger>

                <ModalBookInfo />
              </Dialog.Root>
            )
          })}
        </CardArea>
      </Right>
    </Container>
  )
}
