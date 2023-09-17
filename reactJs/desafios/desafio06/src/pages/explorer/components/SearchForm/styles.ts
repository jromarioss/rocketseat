import { styled } from '@stitches/react'

export const Container = styled('form', {
  display: 'flex',
  alignItems: 'center',

  input: {
    width: '27rem',
    border: '1px solid #303F73',
    borderRadius: 8,
    backgroundColor: 'transparent',
    padding: '0.875rem 1.25rem',
    fontSize: '$sm',
    color: '$gray100',

    '&:focus': {
      outline: 0,
      border: '1px solid #255D6A',
    },
  },

  label: {
    display: 'flex',
    alignItems: 'center',
  },

  svg: {
    marginLeft: '-40px',
  },
})
