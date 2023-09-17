import { styled } from '@stitches/react'

export const Container = styled('div', {
  width: '100%',
  height: '17.5rem',
  backgroundColor: '$gray700',
  padding: '1.5rem',
  borderRadius: 8,
})

export const CardHead = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2rem',
})

export const PerfilArea = styled('div', {
  display: 'flex',
  gap: 16,
})

export const PerfilImage = styled('div', {
  width: '2.5rem',
  height: '2.5rem',
})

export const PerfilInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '3rem',
  gap: 4,

  p: {
    fontSize: '$md',
    color: '$gray00',
    lineHeight: 0,
  },

  span: {
    display: 'block',
    lineHeight: 0,
    fontSize: '$sm',
    color: '$gray400',
    backgroundColor: 'red',
  },
})

export const StarsArea = styled('div', {
  display: 'flex',
  gap: 4,
})

export const CardItem = styled('div', {
  height: '9.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
})

export const CardItemInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  p: {
    fontSize: '$sm',
    color: '$gray300',
  },
})

export const ImageArea = styled('div', {
  img: {
    width: '6.75rem',
    height: '9.5rem',
  },
})

export const BookName = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 4,
  marginBottom: '1.25rem',

  p: {
    fontSize: '$md',
    fontWeight: '$bold',
    color: '$gray100',
    lineHeight: 0,
  },

  span: {
    display: 'block',
    lineHeight: 0,
    fontSize: '$sm',
    color: '$gray400',
    backgroundColor: 'red',
  },
})
