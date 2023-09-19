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
        fixed top-0 left-0 w-full h-full
        flex justify-center items-center
        bg-gray-800/40 text-gray-100
      '
    >
      {t('milkdown.editor-loading')}
    </div>
  )
}

export function MilkdownLazy() {
  return (
    <Suspense fallback={<MilkdownLoading />}>
      <MilkdownRoot />
    </Suspense>
  )
}
