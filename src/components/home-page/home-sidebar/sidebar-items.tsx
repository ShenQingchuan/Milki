import clsx from 'clsx'
import { type FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslator } from '../../../hooks'
import type { SideBarItem } from '../../../utils/types'

export const SideBarItems: FC<{
  items: SideBarItem[]
}> = ({ items }) => {
  const t = useTranslator()
  const navigate = useNavigate()
  const createNavigate = useCallback((route: string) => {
    return () => navigate(route)
  }, [navigate])

  return (
    <>
      {
        items.map(item => (
          <button
            key={item.label}
            className='btn btn-sm btn-ghost justify-start my-1'
            onClick={createNavigate(item.route)}
          >
            <i className={clsx('text-5', item.icon)} />
            <span className='ml-2'>{t(item.label)}</span>
          </button>
        ))
      }
    </>
  )
}
