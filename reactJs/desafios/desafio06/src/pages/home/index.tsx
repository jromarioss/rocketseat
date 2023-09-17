import Image from 'next/image'

import {
  Container,
  Right,
  SeeAllBooks,
  CardArea,
  RightInsideLeft,
  RightInsideCardArea,
  RightInsideRightInfo,
  RightInsideRight,
  RightInsideLogo,
  RightInsideArea,
} from './styles'

import { Card } from '@/components/Card'
import { CardPopular } from '@/components/CardPopular'

import rightIcon from '@/assets/rightIcon.svg'
import inicioIcon from '@/assets/inicioIcon.svg'
import { Left } from '@/components/Left'

export default function home() {
  return (
    <Container>
      <Left />

      <Right>
        <RightInsideLogo>
          <Image src={inicioIcon} alt="" width={32} />
          <h2>Início</h2>
        </RightInsideLogo>

        <CardArea>
          <RightInsideLeft>
            <RightInsideArea>
              <p>Avaliações mais recentes</p>
              <RightInsideCardArea>
                <Card />
                <Card />
                <Card />
              </RightInsideCardArea>
            </RightInsideArea>
          </RightInsideLeft>

          <RightInsideRight>
            <RightInsideRightInfo>
              <p>Livros polulares</p>
              <SeeAllBooks>
                <p>Ver todos</p>
                <Image src={rightIcon} alt="" width={16} />
              </SeeAllBooks>
            </RightInsideRightInfo>
            <CardPopular />
            <CardPopular />
            <CardPopular />
            <CardPopular />
          </RightInsideRight>
        </CardArea>
      </Right>
    </Container>
  )
}
