import clsx from 'clsx'
import type { FC } from 'react'
import { useTranslator } from '../../hooks'
import type { SideBarItem } from '../../utils/types'

export const SideBarItems: FC<{
  items: SideBarItem[]
}> = ({ items }) => {
  const t = useTranslator()

  return (
    <>
      {
        items.map(item => (
          <button key={item.label} className='btn btn-sm btn-ghost justify-start my-1'>
            <i className={clsx('text-5', item.icon)} />
            <span className='ml-2'>{t(item.label)}</span>
          </button>
        ))
      }
    </>
  )
}
