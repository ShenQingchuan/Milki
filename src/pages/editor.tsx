import type { FC } from 'react'
import { EditHeader } from '../components/edit-header'
import { MilkdownRoot } from '../components/milkdown/root'

export const EditorPage: FC = () => {
  return (
    <div className='flex flex-col w-screen h-screen'>
      <EditHeader />
      <MilkdownRoot />
    </div>
  )
}
