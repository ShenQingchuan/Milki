import { useRouteError } from 'react-router-dom'
import type { FC } from 'react'
import { useTranslator } from '../hooks'

interface ErrorPageProps {
  overrideMessage?: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ overrideMessage }) => {
  const error = useRouteError() as any
  const t = useTranslator()
  console.error(error)

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-3xl font-medium mb-2'>OOPS!</h1>
      <p className='mb-6 text-md text-slate-600/60 dark:text-slate-200/60'>
        {t('error-page-tips')}
      </p>
      <p className='
        px-4 py-2
        border rounded-md font-mono
        border-orange-600/60 bg-orange-700/20 text-orange-600
      '>
        <span>Error: </span>
        <span>{overrideMessage ?? (error?.statusText || error?.message)}</span>
      </p>
    </div>
  )
}
