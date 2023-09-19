import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventCallback, useTranslator } from '../hooks'
import { useQuery } from '../hooks/use-query'

export const LoginPage: FC = () => {
  const t = useTranslator()
  const navigate = useNavigate()
  const routeQuery = useQuery<{
    user?: string
  }>()

  const handleSubmitLogin = useEventCallback(() => {
    // Todo ...
  }, [])

  const handleGoSignUp = useEventCallback(() => {
    navigate('/sign-up')
  }, [])

  return (
    <div className='
      w-screen h-screen bg-base-200 dark:bg-base-100
      flex flex-col items-center justify-center
    '>
      <div className="card w-96 bg-base-100/50 dark:bg-neutral shadow-xl">
        <div className="card-body items-center text-center">
          <div className='flex items-center'>
            <img className='w-6' src='/milki-icon.svg' alt='Milki Logo' />
            <div className='ml-2 text-lg font-bold font-mono'>MILKI</div>
            <div className="divider divider-horizontal" />
            <h2 className="card-title">{t('sign-page.title-login')}</h2>
          </div>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">{t('sign-page.label-user-name')}</span>
            </label>
            <input
              type="text"
              defaultValue={routeQuery.user ?? ''}
              placeholder={t('sign-page.placeholder-user-name')}
              className="input input-sm input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs mt-2 mb-10">
            <label className="label">
              <span className="label-text">{t('sign-page.label-password')}</span>
            </label>
            <input
              type="text"
              placeholder={t('sign-page.placeholder-password')}
              className="input input-sm input-bordered w-full max-w-xs"
            />
          </div>

          <div className="card-actions justify-end">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleSubmitLogin}
            >
              {t('sign-page.submit')}
            </button>
            <button
              className="btn btn-sm btn-ghost"
              onClick={handleGoSignUp}
            >
                {t('sign-page.go-sign-up')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
