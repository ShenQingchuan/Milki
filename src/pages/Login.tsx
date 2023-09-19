import { type FC } from 'react'
import { useTranslator } from '../hooks/useTranslator'
import { useEventCallback } from '../hooks/useEventCallback'

export const Login: FC = () => {
  const t = useTranslator()

  const handleSubmitLogin = useEventCallback(() => {
    // Todo ...
  }, [])

  const handleGoRegister = useEventCallback(() => {
    // Todo ...
  }, [])

  return (
    <div className='
      w-screen h-screen
      flex flex-col items-center justify-center
    '>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <div className='flex items-center'>
            <img className='w-6' src='/milki-icon.svg' alt='Milki Logo' />
            <div className='ml-2 text-lg font-bold font-mono'>MILKI</div>
            <div className="divider divider-horizontal" />
            <h2 className="card-title">{t('login-page.title')}</h2>
          </div>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">{t('login-page.label-user-name')}</span>
            </label>
            <input
              type="text"
              placeholder={t('login-page.placeholder-user-name')}
              className="input input-sm input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs mt-2 mb-10">
            <label className="label">
              <span className="label-text">{t('login-page.label-password')}</span>
            </label>
            <input
              type="text"
              placeholder={t('login-page.placeholder-password')}
              className="input input-sm input-bordered w-full max-w-xs"
            />
          </div>

          <div className="card-actions justify-end">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleSubmitLogin}
            >
              {t('login-page.submit')}
            </button>
            <button
              className="btn btn-sm btn-ghost"
              onClick={handleGoRegister}
            >
                {t('login-page.go-register')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
