import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  width: '100%',
  maxWidth: 1180,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 0',
  margin: '0 auto',

  img: {
    cursor: 'pointer',
  },

  div: {
    position: 'relative',
  }
})

export const CountProducts = styled('div', {
  width: '1.5rem',
  height: '1.5rem',
  position: 'absolute',
  top: 15,
  left: 30,
  backgroundColor: '$green300',
  borderRadius: 999,
  border: '3px solid #121215',
  
  p: {
    marginTop: 1,
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  }
})
