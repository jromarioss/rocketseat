import Image from 'next/image'

import {
  AreaButton,
  Button,
  Container,
  Left,
  Right,
  RightInside,
} from './styles'

import BookWiseLogo from '../../assets/BookWise.png'
import GoogleLogo from '../../assets/googleLogo.svg'
import GithubLogo from '../../assets/githubLogo.svg'
import RocketLogo from '../../assets/rocketLogo.svg'

export default function Register() {
  function handleClick() {
    console.log('fois')
  }

  return (
    <Container>
      <Left>
        <Image src={BookWiseLogo} alt="" />
      </Left>
      <Right>
        <RightInside>
          <h1>Boas vindas!</h1>
          <p>Faça seu login ou acesse como visitante.</p>
          <AreaButton>
            <Button onClick={handleClick}>
              <Image src={GoogleLogo} alt="logo google" />
              <p>Entrar com Google</p>
            </Button>
            <Button>
              <Image src={GithubLogo} alt="logo github" />
              <p>Entrar com GitHub</p>
            </Button>
            <Button>
              <Image src={RocketLogo} alt="logo rocket" />
              <p>Acessar como visitante</p>
            </Button>
          </AreaButton>
        </RightInside>
      </Right>
    </Container>
  )
}
