import clsx from 'clsx'
import type { FC } from 'react'
import { HomeHeader } from '../components/home-header'
import { useTranslator } from '../hooks'
import type { SideBarItem } from '../utils/types'
import {
  SIDEBAR_BOTTOM_ITEMS,
  SIDE_BAR_RELATE_TO_ME_ITEMS,
  SIDE_BAR_WORKSPACE_ITEMS,
} from '../utils/constants'

const SideBarItems: FC<{
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

export const HomePage: FC = () => {
  const t = useTranslator()

  return (
    <div className='flex flex-col h-full'>
      <HomeHeader />

      <div
        className='flex items-center flex-1'
      >
        {/* Side bar */}
        <div className='flex flex-col w-[200px] h-full px-4 pt-8 pb-10'>
          <button className="btn btn-sm border-none rounded light:bg-primary dark:bg-neutral-700">
            {t('home-page.side-bar.create-button')}
          </button>
          <div className="divider" />
          <SideBarItems items={SIDE_BAR_RELATE_TO_ME_ITEMS} />
          <div className="divider" />
          <SideBarItems items={SIDE_BAR_WORKSPACE_ITEMS} />
          <div className="divider" />
          <div className='text-sm ml-2 text-secondary select-none'>
            {t('home-page.side-bar.label-quick-access')}
          </div>
          {/* Todo: ... */}
          <div className="divider mt-auto" />
          <SideBarItems items={SIDEBAR_BOTTOM_ITEMS} />
        </div>

        {/* Workbench view */}

      </div>
    </div>
  )
}
