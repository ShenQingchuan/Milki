import { type FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslator } from '../../../hooks'
import type { GetRecentDocEden } from '../../../../shared/types'

type DocumentListViewItem = GetRecentDocEden // :alias:
interface DocListTableProps {
  docList: DocumentListViewItem[]
}

export const DocListTable: FC<DocListTableProps> = (props) => {
  const { docList } = props
  const t = useTranslator()
  const navigate = useNavigate()

  const navigateToDoc = useCallback((docId: string) => {
    return () => navigate(`/doc?id=${docId}`)
  }, [navigate])

  return (
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
          docList.map(doc => (
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
  )
}
