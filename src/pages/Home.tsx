import clsx from 'clsx'
import type { FC } from 'react'
import { HomeHeader } from '../components/home-header'
import { useTranslator } from '../hooks'

interface SideBarItem {
  icon: string
  label: string
}

const sideBarRelateToMeItems: SideBarItem[] = [
  { icon: 'i-carbon-recently-viewed', label: 'home-page.side-bar.recently-viewed' },
  { icon: 'i-carbon-share-knowledge', label: 'home-page.side-bar.shared-with-me' },
  { icon: 'i-ep-collection-tag', label: 'home-page.side-bar.collections' },
]

const sideBarSpaceItems: SideBarItem[] = [
  { icon: 'i-carbon-home', label: 'home-page.side-bar.my-desktop' },
  { icon: 'i-iconoir-group', label: 'home-page.side-bar.team-spaces' },
]

const sideBarBottomItems: SideBarItem[] = [
  { icon: 'i-carbon-trash-can', label: 'home-page.side-bar.recycle-bin' },
]

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
          <SideBarItems items={sideBarRelateToMeItems} />
          <div className="divider" />
          <SideBarItems items={sideBarSpaceItems} />
          <div className="divider" />
          <div className='text-sm ml-2 text-secondary select-none'>
            {t('home-page.side-bar.label-quick-access')}
          </div>
          {/* Todo: ... */}
          <div className="divider mt-auto" />
          <SideBarItems items={sideBarBottomItems} />
        </div>

        {/* Workbench view */}

      </div>
    </div>
  )
}
