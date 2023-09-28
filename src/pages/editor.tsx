import type { FC } from 'react'
import { Provider } from 'jotai'
import { EditHeader } from '../components/edit-header'
import { milkdownStore } from '../atoms/milkdown'
import { MilkdownLazy } from '../components/milkdown/lazy-root'

export const EditorPage: FC = () => {
  return (
    <Provider store={milkdownStore}>
      <div className='flex flex-col w-screen h-screen'>
        <EditHeader />
        <MilkdownLazy />
      </div>
    </Provider>
  )
}
