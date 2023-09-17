import Link from 'next/link'
import Image from 'next/image'

import { useCart } from '../../hook/useCart'
import { Modal } from '../Modal'

import { HeaderContainer, CountProducts } from './styles'
import logoImg from '../../assets/logo.svg'

export function Header() {
  const { cartItems } = useCart()

  return (
    <HeaderContainer>
      <Link href={'/'} prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>

      <div>
        {cartItems.length >= 1 &&(
          <CountProducts><p>{cartItems.length}</p></CountProducts>
        )}
        <Modal />
      </div>
    </HeaderContainer>
  )
}