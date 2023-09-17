import { styled } from '@stitches/react'

export const Container = styled('div', {
  display: 'flex',
  width: '100vw',
  padding: 20,
  paddingRight: 0,
})

export const Right = styled('div', {
  width: '62.25rem',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'space-between',
  paddingInline: 96,
})

export const RightInsideLogo = styled('div', {
  display: 'flex',
  marginTop: '4.5rem',
  marginBottom: '2.5rem',
  gap: 12,

  p: {
    fontSize: '$lg',
  },
})

export const RightInsideArea = styled('div', {
  width: '38rem',

  p: {
    fontSize: '$sm',
    marginBottom: '1rem',
    color: '$gray100',
  },
})

export const RightInsideCardArea = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
})

export const CardArea = styled('div', {
  width: '62.25rem',
  display: 'flex',
  justifyContent: 'space-between',
})

export const RightInsideLeft = styled('div', {})

export const RightInsideRightInfo = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',

  p: {
    fontSize: '$sm',
    color: '$gray100',
  },
})

export const SeeAllBooks = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,

  p: {
    fontSize: '$sm',
    color: '$purple100',
    transition: '.5s ease',

    '&:hover': {
      color: '$purple200',
    },
  },
})

export const RightInsideRight = styled('div', {
  width: '20rem',
})
