import type { FC } from 'react'
import { useMyRecentDocsRequest } from '../../../hooks/home-page/use-user-docs-request'
import { useTranslator } from '../../../hooks'
import { DocListTable } from './doc-list-table'

export const MyRecentDocs: FC = () => {
  const t = useTranslator()
  const { myRecentDocs, isLoading } = useMyRecentDocsRequest()

  if (isLoading) {
    return (
      <div className='flex flex-col flex-1 h-full px-16 pt-8 pb-10 justify-center items-center'>
        <span className="loading loading-ring loading-lg" />
      </div>
    )
  }

  return (
    <div className='flex flex-col flex-1 h-full px-16 pt-8 pb-10'>
      {/* Workbench header */}
      <div className='flex items-center'>
        <h3 className='text-2xl font-bold'>
          {t('home-page.workbench.recent-docs.header-title')}
        </h3>
        {/* Todo: Workbench header tool buttons */}
      </div>

      {/* Workbench body area */}
      <DocListTable docList={myRecentDocs} />
    </div>
  )
}
