import axios from 'axios'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'

import { useCart } from '../../hook/useCart'
import { Handbag, X } from '@phosphor-icons/react'

import { formatPrice } from '../../libs/formatPrice'

import { 
  ButtonOpen,
  ButtonClose,
  ModalContent,
  ProductEmpty,
  ProductInfo,
  ProductInfoAmount,
  ProductInfoPrice,
  ProductInfoButton,
  ProductCards,
  ProductCardsBox,
  ProductCardImage,
  ProductCardInfo,
  ProductCardPrice,
  ProductCardTitle,
} from './styles'
import { ContextProductProps } from '../../contexts/CartContext'

export function Modal() {
  const { cartItems, totalToPay, deleteItemOnTheCart } = useCart()

  async function handleBuyProduct() {
    const itemsToBuy = cartItems.map((product: ContextProductProps) => ({
        price: product.priceId,
        quantity: 1,
    }))

    console.log(itemsToBuy)

    try {
      const response = await axios.post('/api/checkout', {
        itemsToBuy
      })

      const { checkoutUrl } = response.data

      console.log(checkoutUrl)

      window.location.href = checkoutUrl
    } catch (err) {
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonOpen>
          <Handbag size={20} color='#e1e1e6' />
        </ButtonOpen>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />

        <ModalContent>
          <ButtonClose>
            <X size={24} color='#e1e1e6' />
          </ButtonClose>

          <h2>Sacola de compras</h2>

          <ProductCardsBox>
            {cartItems.map((item) => (
              <ProductCards>
                <ProductCardImage>
                  <Image src={item.imageUrl} alt="" width={90} height={90} />
                </ProductCardImage>
                <ProductCardInfo>
                  <ProductCardTitle>{item.name}</ProductCardTitle>
                  <ProductCardPrice>{formatPrice(item.price)}</ProductCardPrice>
                  <button onClick={() => deleteItemOnTheCart(item)}>
                    Remover
                  </button>
                </ProductCardInfo>
              </ProductCards>
            ))}
          </ProductCardsBox>
          {cartItems.length <= 0 &&(
            <ProductEmpty>Sua sacola está vazia.</ProductEmpty>
          )}

          {cartItems.length >= 1 &&(
            <ProductInfo>
              <ProductInfoAmount>
                <p>Quantidade</p>
                <p>{cartItems.length} itens</p>
              </ProductInfoAmount>
              <ProductInfoPrice>
                <p>Valor total</p>
                <p>{formatPrice(totalToPay)}</p>
              </ProductInfoPrice>
              <ProductInfoButton onClick={handleBuyProduct}>
                Finalizar compra
              </ProductInfoButton>
            </ProductInfo>
          )}

        </ModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
