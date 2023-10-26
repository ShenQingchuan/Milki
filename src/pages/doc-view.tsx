import type { FC } from 'react'
import { Provider } from 'jotai'
import { CommonHeader } from '../components/common-header'
import { milkdownStore } from '../atoms/milkdown'
import { MilkdownSummary } from '../components/milkdown/root'
import { useMilkdownSetup } from '../hooks'
import { MilkdownSummaryProvider } from '../components/milkdown/provider'

export const DocView: FC = () => {
  const {
    markdownContent,
    milkdownRef,
  } = useMilkdownSetup()

  return (
    <Provider store={milkdownStore}>
      <div className='flex flex-col h-full'>
        <CommonHeader />

        <div
          className='flex items-center flex-1 w-[80vw] mx-auto'
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
