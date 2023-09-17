import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { X, BookOpen, Bookmark, Check } from 'lucide-react'

import {
  Container,
  Overlay,
  BottomInfo,
  Close,
  CardItem,
  BottomText,
  CardTop,
  CardAssess,
  CardComment,
  CardBottom,
  InfoTitle,
  InfoBook,
  Middle,
  AssessStars,
  ButtonArea,
  AssessHead,
  AssessInfo,
  StarsArea,
} from './styles'

import Star from '@/assets/star.svg'
import StarEmpty from '@/assets/starEmpty.svg'
import Book from '@/assets/images/Book.png'
import Avatar from '@/assets/Avatar.png'
import { useState } from 'react'

export function ModalBookInfo() {
  const [comment, setComment] = useState(false)

  return (
    <Dialog.Portal>
      <Overlay />
      <Container>
        <Close>
          <X />
        </Close>

        <CardItem>
          <CardTop>
            <Image src={Book} alt="" width={150} />
            <InfoBook>
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
              <p className="assessment">3 avaliações</p>
            </InfoBook>
          </CardTop>
          <CardBottom>
            <BottomInfo>
              <Bookmark size={24} />
              <BottomText>
                <p>Categoria</p>
                <span>Computação, educação</span>
              </BottomText>
            </BottomInfo>
            <BottomInfo>
              <BookOpen size={24} />
              <BottomText>
                <p>Páginas</p>
                <span>251</span>
              </BottomText>
            </BottomInfo>
          </CardBottom>
        </CardItem>

        <Middle>
          <span>Avaliações</span>
          <p onClick={() => setComment(true)}>Avaliar</p>
        </Middle>

        {comment && (
          <CardComment>
            <AssessHead>
              <Image src={Avatar} alt="" />

              <AssessInfo>
                <p>José Romário</p>
              </AssessInfo>

              <AssessStars>
                <Image src={Star} alt="" />
                <Image src={Star} alt="" />
                <Image src={Star} alt="" />
                <Image src={StarEmpty} alt="" />
                <Image src={StarEmpty} alt="" />
              </AssessStars>
            </AssessHead>
            <textarea placeholder="Escreva sua avaliação" maxLength={200} />
            <ButtonArea>
              <button onClick={() => setComment(false)}>
                <X color="#8381D9" />
              </button>
              <button>
                <Check color="#50B2C0" />
              </button>
            </ButtonArea>
          </CardComment>
        )}

        <CardAssess>
          <AssessHead>
            <Image src={Avatar} alt="" />

            <AssessInfo>
              <p>José Romário</p>
              <span>Há 3 dias</span>
            </AssessInfo>

            <AssessStars>
              <Image src={Star} alt="" />
              <Image src={Star} alt="" />
              <Image src={Star} alt="" />
              <Image src={StarEmpty} alt="" />
              <Image src={StarEmpty} alt="" />
            </AssessStars>
          </AssessHead>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, a
            quis! Dolorum adipisci enim, ducimus aperiam sint veniam recusandae
            libero dicta, ratione animi optio facere voluptate iste consequuntur
            corrupti pariatur.
          </p>
        </CardAssess>

        <CardAssess>
          <AssessHead>
            <Image src={Avatar} alt="" />

            <AssessInfo>
              <p>José Romário</p>
              <span>Há 3 dias</span>
            </AssessInfo>

            <AssessStars>
              <Image src={Star} alt="" />
              <Image src={Star} alt="" />
              <Image src={Star} alt="" />
              <Image src={StarEmpty} alt="" />
              <Image src={StarEmpty} alt="" />
            </AssessStars>
          </AssessHead>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, a
            quis! Dolorum adipisci enim, ducimus aperiam sint veniam recusandae
            libero dicta, ratione animi optio facere voluptate iste consequuntur
            corrupti pariatur.
          </p>
        </CardAssess>

        <CardAssess>
          <AssessHead>
            <Image src={Avatar} alt="" />

            <AssessInfo>
              <p>José Romário</p>
              <span>Há 3 dias</span>
            </AssessInfo>

            <AssessStars>
              <Image src={Star} alt="" />
              <Image src={Star} alt="" />
              <Image src={Star} alt="" />
              <Image src={StarEmpty} alt="" />
              <Image src={StarEmpty} alt="" />
            </AssessStars>
          </AssessHead>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, a
            quis! Dolorum adipisci enim, ducimus aperiam sint veniam recusandae
            libero dicta, ratione animi optio facere voluptate iste consequuntur
            corrupti pariatur.
          </p>
        </CardAssess>
      </Container>
    </Dialog.Portal>
  )
}
