import type { FC } from 'react'
import { useIsDark, useThemeActions } from '../../../hooks'

export const DarkModeIcon: FC = () => {
  const isDarkMode = useIsDark()
  const { toggle: toggleDarkMode } = useThemeActions()

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
      <i className="swap-on i-carbon-moon text-xl" />
      <i className="swap-off i-carbon-sun text-xl" />
    </label>
  )
}
