import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    white: '#FFF',
    'red-light': '#EE7979',
    blue: '#364D9D',
    'blue-light': '#647AC7',
    'card-stoped': '#1a181ba5',
    gray: {
      700: '#F7F7F8',
      600: '#EDECEE',
      500: '#D9D8DA',
      400: '#9F9BA1',
      300: '#5F5B62',
      200: '#3E3A40',
      100: '#1A181B'
    },
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  }
});
