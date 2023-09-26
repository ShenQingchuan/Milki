import type { FC } from 'react'
import { useTranslator } from '../../hooks'

export const EditHeader: FC = () => {
  const t = useTranslator()

  return (
    <div className='flex items-center p-4 shadow'>
      <button className='btn btn-sm'>
        {t('edit-page.header.go-back')}
      </button>
      <input
        type="text"
        placeholder={t('edit-page.header.title-placeholder')}
        className="input input-sm input-ghost w-xs mx-4"
      />

      <div className='ml-auto flex items-center'>
        <button className='btn btn-circle btn-sm btn-ghost mx-1'>
          <i className='i-ep-collection-tag text-lg' />
        </button>
        <button className='btn btn-circle btn-sm btn-ghost mx-1'>
          <i className='i-ri-history-line text-lg' />
        </button>
        <button className='btn btn-sm ml-2'>
          {t('edit-page.header.collaboration')}
        </button>
        <div className="divider divider-horizontal mx-1 w-1" />
        <button className='btn btn-sm mr-2'>
          {t('edit-page.header.share')}
        </button>
        <button className='btn btn-circle btn-sm btn-ghost'>
          <i className='i-fluent-more-circle-24-regular text-xl' />
        </button>
      </div>
    </div>
  )
}
