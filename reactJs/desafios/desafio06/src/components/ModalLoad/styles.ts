import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const Container = styled(Dialog.Content, {
  backgroundColor: '$gray700',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '3.25rem 4.5rem',

  h2: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: '$md',
    textAlign: 'center',
  },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
})

export const Close = styled(Dialog.Close, {
  all: 'unset',
  position: 'absolute',
  top: 16,
  right: 16,
})

export const ButtonArea = styled('div', {
  marginTop: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const Button = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  width: '23.25rem',
  height: '4.5rem',
  paddingLeft: 20,
  backgroundColor: '$gray600',
  color: '$gray200',
  borderRadius: 8,
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$gray500',
  },

  p: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: '$lg',
    fontWeight: '$bold',
  },
})
