import { styled } from '@stitches/react'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 24,
})

export const MenuButton = styled('div', {
  display: 'flex',
  gap: 12,
  paddingLeft: 16,
  borderLeft: '4px solid transparent',

  '&:hover': {
    borderLeft: '4px solid #7FD1CC',
    transition: 'ease-in-out',
  },

  p: {
    '&:hover': {
      color: '$gray300',
    },
  },
})
