import { styled } from '@stitches/react'

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  gap: 20,
  backgroundColor: '$gray700',
  padding: '1.125rem 1.5rem',
  borderRadius: 8,
  marginBottom: '0.75rem',
})

export const CardItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const InfoTitle = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  p: {
    fontSize: '$md',
    fontWeight: '$bold',
    color: '$gray100',
  },

  span: {
    display: 'block',
    fontSize: '$sm',
    color: '$gray400',
  },
})

export const StarsArea = styled('div', {
  display: 'flex',
  gap: 4,
})
