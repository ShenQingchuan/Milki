import type { FC, PropsWithChildren } from 'react'
import { HeaderNotification } from './header-notification'
import { MilkiAvatar } from './avatar'
import { DarkModeIcon } from './is-dark'

export const CommonHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='
      flex items-center
      px-4 py-2 w-screen shadow-xl
    '>
      <a
        className='ml-2 font-bold font-mono text-xl select-none outline-none'
        href="/"
      >
        {import.meta.env.VITE_APP_NAME}
      </a>

      <div className='ml-auto flex items-center'>
        <div className='flex items-center mr-2'>
          {children}
        </div>

        <DarkModeIcon />
        <HeaderNotification />
        <MilkiAvatar />
      </div>
    </div>
  )
}
