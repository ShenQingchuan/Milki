import type { FC } from 'react'
import { Suspense, lazy } from 'react'
import { useTranslator } from '../../hooks'

const MilkdownRoot = lazy(
  () => import('./root').then(module => ({
    default: module.MilkdownRoot,
  })),
)

function MilkdownLoading() {
  const t = useTranslator()

  return (
    <div
      className='
        fixed top-0 left-0 self-stretch
        w-screen h-screen
        flex flex-1 justify-center items-center
        bg-gray-800/40 text-gray-100
      '
    >
      {t('milkdown.editor-loading')}
    </div>
  )
}

export const MilkdownLazy: FC = () => {
  return (
    <Suspense fallback={<MilkdownLoading />}>
      <MilkdownRoot />
    </Suspense>
  )
}
