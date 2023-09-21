import type { FC } from 'react'

export const HeaderNotification: FC = () => {
  return (
    <div className='flex items-center ml-auto mr-4 cursor-pointer hover:scale-125 transition-all'>
      <i className='i-carbon-notification text-8' />
    </div>
  )
}
