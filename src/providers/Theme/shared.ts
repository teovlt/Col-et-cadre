import type { Theme } from './types'

export const themeLocalStorageKey = 'cyclette-theme'

export const defaultTheme = 'light'

export const getImplicitPreference = (): Theme | null => {
  return 'light'
}
