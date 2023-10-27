import { type FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SIDEBAR_BOTTOM_ITEMS, SIDE_BAR_RELATE_TO_ME_ITEMS, SIDE_BAR_WORKSPACE_ITEMS } from '../../../utils/constants'
import { useTranslator } from '../../../hooks'
import { SideBarItems } from './sidebar-items'

export const HomeSideBar: FC = () => {
  const t = useTranslator()
  const navigate = useNavigate()

  const createNewDoc = useCallback(() => {
    navigate('/edit')
  }, [navigate])

  return (
    <div className='flex flex-col w-[200px] h-full px-4 pt-8 pb-10'>
      <button
        className="btn btn-sm border-none rounded dark:bg-neutral-700"
        onClick={createNewDoc}
      >
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
  )
}
