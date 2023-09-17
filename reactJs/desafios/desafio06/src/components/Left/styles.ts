import { styled } from '@stitches/react'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '$gray700',
  width: 232,
  height: 670,
  borderRadius: 12,
})

export const LoginArea = styled('div', {
  display: 'flex',
  gap: 12,
  marginBottom: 24,

  p: {
    '&:hover': {
      color: '$gray300',
    },
  },
})
