import { styled } from '@stitches/react'

export const Container = styled('div', {
  maxWidth: '100vw',
  display: 'flex',
  boxSizing: 'border-box',
  padding: 20,
})

export const Left = styled('div', {
  img: {
    width: '29rem',
    height: 'calc(100vh - 40px)',
  },
})

export const Right = styled('div', {
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
})

export const RightInside = styled('div', {
  width: 372,
  height: 248,

  h1: {
    fontSize: '$2xl',
    lineHeight: '$shorter',
    color: '$gray100',
  },

  p: {
    fontSize: '$md',
    lineHeight: '$shorter',
    color: '$gray200',
  },
})

export const AreaButton = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 40,
  gap: 16,
})

export const Button = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  width: '100%',
  paddingLeft: 20,
  height: 72,
  backgroundColor: '$gray600',
  color: '$gray200',
  borderRadius: 8,
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$gray500',
  },

  p: {
    fontSize: '$lg',
    fontWeight: '$bold',
  },
})
