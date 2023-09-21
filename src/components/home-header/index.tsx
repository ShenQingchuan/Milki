import type { FC } from 'react'
import { HeaderNotification } from './header-notification'
import { MilkiAvatar } from './avatar'
import { DarkModeIcon } from './is-dark'

export const HomeHeader: FC = () => {
  return (
    <div className='
      flex items-center
      px-4 py-2 w-screen shadow-xl
    '>
      <a
        className='ml-2 font-bold font-mono text-xl select-none outline-none'
        href="/"
      >
        MILKI
      </a>

      <div className='ml-auto flex items-center'>
        <DarkModeIcon />
        <HeaderNotification />
        <MilkiAvatar />
      </div>
    </div>
  )
}
