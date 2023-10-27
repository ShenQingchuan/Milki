import { type FC, useCallback } from 'react'
import { Provider, useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { CommonHeader } from '../components/common-header'
import { milkdownStore, milkiDocId } from '../atoms/milkdown'
import { MilkdownSummary } from '../components/milkdown/root'
import { useMilkdownSetup, useTranslator } from '../hooks'
import { MilkdownSummaryProvider } from '../components/milkdown/provider'

export const DocView: FC = () => {
  const t = useTranslator()
  const {
    markdownContent,
    milkdownRef,
  } = useMilkdownSetup()
  const docId = useAtomValue(milkiDocId)
  const navigate = useNavigate()

  const goEdit = useCallback(() => {
    navigate(`/edit?id=${docId}`, { replace: true })
  }, [docId, navigate])

  return (
    <Provider store={milkdownStore}>
      <div className='flex flex-col h-full'>
        <CommonHeader>
          <button
            className='btn btn-sm mx-2'
            onClick={goEdit}
          >
            {t('doc-view-page.go-edit')}
          </button>
        </CommonHeader>

        <div
          className='flex items-center flex-1 w-full'
          data-milki-editable='false'
        >
          <MilkdownSummaryProvider>
            <MilkdownSummary
              defaultContent={markdownContent}
              milkdownRef={milkdownRef}
              options={{ isEditable: false }}
            />
          </MilkdownSummaryProvider>
        </div>
      </div>
    </Provider>
  )
}
