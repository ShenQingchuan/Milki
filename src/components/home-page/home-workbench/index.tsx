import { type FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyRecentDocsRequest } from '../../../hooks/home-page/use-user-docs-request'
import { useTranslator } from '../../../hooks'

export const Workbench: FC = () => {
  const t = useTranslator()
  const navigate = useNavigate()
  const { myRecentDocs, isLoading } = useMyRecentDocsRequest()

  const navigateToDoc = useCallback((docId: string) => {
    return () => navigate(`/edit?id=${docId}`)
  }, [navigate])

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
          {/* Todo(Refactor): Reuse the UI structure but pass-in the title by page routes */}
          {t('home-page.workbench.header-title')}
        </h3>
        {/* Todo: Workbench header tool buttons */}
      </div>

      {/* Workbench body */}
      {/* Todo(Refactor): Reuse the UI structure but pass-in these table headers by requirements */}
      <table className="table mt-6">
        <thead>
          <tr>
            <th>{t('home-page.workbench.file-name')}</th>
            <th>{t('home-page.workbench.creator')}</th>
            <th>{t('home-page.workbench.last-modified')}</th>
          </tr>
        </thead>
        <tbody>
          {
            myRecentDocs.map(doc => (
              <tr
                className='hover:bg-base-200/40 cursor-pointer'
                key={doc.id}
                onClick={navigateToDoc(doc.id)}
              >
                <td>{doc.title || t('home-page.workbench.empty-doc-title-placeholder')}</td>
                <td>{doc.owner.name}</td>
                <td>{new Date(doc.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
