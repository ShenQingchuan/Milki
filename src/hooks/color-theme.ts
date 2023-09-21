import { useAtomValue } from 'jotai'
import { useContext } from 'react'
import { DarkModeActionContext, darkModeAtom } from '../providers/dark-mode'

export function useThemeActions() {
  return useContext(DarkModeActionContext)
}

export const useIsDark = () => useAtomValue(darkModeAtom)
