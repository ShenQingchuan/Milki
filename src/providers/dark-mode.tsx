import type { FC, PropsWithChildren } from 'react'
import { createContext, useEffect } from 'react'
import { atomWithStorage } from 'jotai/utils'
import { Provider, useAtomValue } from 'jotai'
import { createStore } from 'jotai/vanilla'
import { NOOP } from '../utils/constants'

export const darkModeStore = createStore()
export const darkModeAtom = atomWithStorage('dark-mode', false)
export const DarkModeActionContext = createContext<typeof actions>({
  toggle: NOOP,
})

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const actions = {
  toggle: () => darkModeStore.set(
    darkModeAtom,
    prev => !prev,
  ),
}

function getMatches(query: string): boolean {
  // Prevents SSR issues
  if (typeof window !== 'undefined')
    return window.matchMedia(query).matches
  return false
}

function ThemeObserver() {
  const isDarkMode = useAtomValue(darkModeAtom)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.dataset.theme = 'business'
      document.documentElement.classList.toggle('dark', true)
    }
    else {
      document.documentElement.dataset.theme = 'lofi'
      document.documentElement.classList.toggle('dark', false)
    }
  }, [isDarkMode])

  return null
}

const DarkModeStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={darkModeStore}>
    {children}
  </Provider>
}
const DarkModeActionsProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const matchMedia = window.matchMedia(COLOR_SCHEME_QUERY)
    // Triggered at the first client-side load and if query changes
    const handleChange = () => {
      darkModeStore.set(darkModeAtom, getMatches(COLOR_SCHEME_QUERY))
    }
    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange)
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [])
  return (
    <DarkModeActionContext.Provider value={actions}>
      {children}
      <ThemeObserver />
    </DarkModeActionContext.Provider>
  )
}

export const DarkModeContexts = [
  <DarkModeStoreProvider key='DarkModeStoreProvider' />,
  <DarkModeActionsProvider key='DarkModeActionsProvider' />,
]
