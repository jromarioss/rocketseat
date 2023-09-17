import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme // guarda o valor do defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
