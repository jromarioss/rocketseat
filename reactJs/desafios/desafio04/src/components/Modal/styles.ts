import * as Dialog from '@radix-ui/react-dialog'

import { styled } from '../../styles'

export const ModalContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  backgroundColor: '$gray800',
  width: '30rem',
  height: '100vh',
  paddingInline: '2rem',

  h2: {
    color: '$gray100',
    marginTop: '4.5rem',
    marginBottom: '2rem',
    fontSize: '$lg',
    fontWeight: 'bold'
  }
})

export const ButtonOpen = styled('button', {
  height: 48,
  width: 48,
  backgroundColor: '$gray800',
  borderRadius: 6,
  border: 0,
  cursor: 'pointer',
})

export const ButtonClose = styled(Dialog.Close, {
  position: 'fixed',
  top: 24,
  right: 24,
  backgroundColor: 'transparent',
  border: 'none'
})

export const ProductCardsBox = styled('div', {
  width: '100%',
  height: '29rem',
  overflow: 'hidden',
})

export const ProductCards = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  marginBottom: '1.4375rem'
})

export const ProductCardImage = styled('div', {
  height: '5.8125rem',
  width: '6.25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
})

export const ProductCardInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flex: 1,

  button: {
    width: 30,
    marginTop: '0.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '$green500',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',

    '&:hover' : {
      color: '$green300',
      transition: '.2s ease'
    }
  }
})

export const ProductCardTitle = styled('p', {
  color: '$gray100',
  fontSize: '$md',
  lineHeight: '160%',
})

export const ProductCardPrice = styled('p', {
  color: '$gray100',
  fontSize: '$md',
  lineHeight: '160%',
  fontWeight: 'bold'
})

export const ProductInfo = styled('div', {
  position: 'fixed',
  bottom: '3rem',
  width: '24rem',
})

export const ProductInfoAmount = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
  fontWeight: '1rem',
})

export const ProductInfoPrice = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '3.5625rem',
  fontWeight: 'bold',
  fontSize: '$md',
})

export const ProductInfoButton = styled('button', {
  width: '100%',
  height: '4.3125rem',
  border: 'none',
  borderRadius: 8,
  backgroundColor: '$green300',
  color: '$gray100',
  fontWeight: 'bold',
  fontSize: '$md',
})

export const ProductEmpty = styled('p', {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-40%, -50%)',
  fontSize: '$lg',
})