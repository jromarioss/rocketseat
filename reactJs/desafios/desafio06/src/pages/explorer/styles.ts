import { styled } from '@stitches/react'

export const Container = styled('div', {
  display: 'flex',
  width: '100vw',
  padding: 20,
  paddingRight: 0,
})

export const Right = styled('div', {
  width: '92.25rem',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  paddingInline: 96,
})

export const RightInsideLogo = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '4.5rem',
  marginBottom: '2.5rem',
  gap: 12,

  p: {
    fontSize: '$lg',
  },
})

export const Logo = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
})

export const RightInsideArea = styled('div', {
  width: '38rem',

  p: {
    fontSize: '$sm',
    marginBottom: '1rem',
    color: '$gray100',
  },
})

export const ButtonArea = styled('div', {
  display: 'flex',
  gap: 12,
  marginBottom: '3rem',

  button: {
    all: 'unset',
    border: '1px solid #8381D9',
    padding: '0.25rem 1rem',
    borderRadius: 99,
    fontSize: '$md',
    color: '$purple100',
    transition: '.3s',

    '&:hover': {
      color: '$gray100',
      backgroundColor: '$purple200',
      border: '1px solid #2A2879',
    },
  },
})

export const CardArea = styled('div', {
  width: '100%',
  display: 'flex',
  gap: 20,
  flexWrap: 'wrap',
})

export const Cards = styled('div', {
  width: '19.875rem',
  display: 'flex',
  gap: 20,
  backgroundColor: '$gray700',
  padding: '1rem 1.25rem',
  borderRadius: 8,
  cursor: 'pointer',
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
