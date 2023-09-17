import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const Container = styled(Dialog.Content, {
  height: '100%',
  backgroundColor: '$gray800',
  position: 'fixed',
  top: 0,
  right: 0,
  padding: '3rem 4rem 0 3rem',
  overflowY: 'scroll',

  p: {
    fontFamily: 'Nunito, sans-serif',
  },

  span: {
    fontFamily: 'Nunito, sans-serif',
  },

  '.assessment': {
    color: '$gray400',
    fontSize: '$sm',
  },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100%',
  height: '100%',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
})

export const Close = styled(Dialog.Close, {
  all: 'unset',
  position: 'absolute',
  top: 16,
  right: 16,
})

export const CardItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '2rem 1.5rem',
  borderRadius: 8,
  backgroundColor: '$gray700',
})

export const CardTop = styled('div', {
  display: 'flex',
  gap: '2rem',
  marginBottom: '2.5rem',
})

export const CardBottom = styled('div', {
  display: 'flex',
  gap: '3rem',
  borderTop: '1px solid #303F73',
  paddingTop: '1.5rem',
})

export const BottomInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
})

export const BottomText = styled('div', {
  p: {
    fontSize: '$sm',
    color: '$gray300',
    marginBottom: '0.25rem',
  },

  span: {
    display: 'block',
    fontSize: '$md',
    fontWeight: '$bold',
    color: '$gray200',
  },
})

export const InfoBook = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const InfoTitle = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  p: {
    fontSize: '$lg',
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
  flex: 1,
  alignItems: 'flex-end',
  gap: 4,
  marginBottom: '0.25rem',
})

export const Middle = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '2.5rem',
  marginBottom: '1rem',

  p: {
    fontSize: '$md',
    fontWeight: '$bold',
    color: '$purple100',
    cursor: 'pointer',
  },

  span: {
    display: 'block',
    fontSize: '$sm',
    color: '$gray200',
  },
})

export const ButtonArea = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  justifyContent: 'flex-end',
  marginTop: '0.75rem',

  button: {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: 4,
    backgroundColor: '$gray600',
    cursor: 'pointer',
  },
})

export const CardComment = styled('div', {
  width: '35.25rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  borderRadius: 8,
  backgroundColor: '$gray700',
  marginBottom: '0.75rem',

  textArea: {
    width: '100%',
    height: '9rem',
    border: '1px solid #303F73',
    borderRadius: 8,
    backgroundColor: '#0E1116',
    padding: '0.875rem 1.25rem',
    fontSize: '$sm',
    color: '$gray200',
    fontFamily: 'Nunito, sans-serif',
    resize: 'none',

    '&:focus': {
      outline: 0,
      border: '1px solid #255D6A',
    },
  },
})

export const CardAssess = styled('div', {
  width: '35.25rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  borderRadius: 8,
  backgroundColor: '$gray700',
  marginBottom: '0.75rem',

  p: {
    fontSize: '$sm',
    color: '$gray300',
  },
})

export const AssessHead = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '1.25rem',
})

export const AssessInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

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

export const AssessStars = styled('div', {
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  gap: 4,

  img: {
    width: '1rem',
  },
})
