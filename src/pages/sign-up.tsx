import { type FC, useState } from 'react'
import http from 'redaxios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { useEventCallback, useTranslator } from '../hooks'
import type { MilkiResponse } from '../../server/src/types'
import { PASSWORD_FORM_FIELD_VALIDATION, USERNAME_FORM_FIELD_VALIDATION } from '../utils/constants'

interface SignUpFormInputs {
  username: string
  password: string
}

export const SignUpPage: FC = () => {
  const t = useTranslator()
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>()

  const onRequestError = useEventCallback((errMsg: string) => {
    if (errMsg.includes('dup key: { name:')) {
      errMsg = t('sign-page.sign-up-dup-username')
    }

    toast.error(`${
      t('sign-page.sign-up-error-label')
    } - ${
      errMsg.length > 24
        ? `${errMsg.slice(0, 24)}...`
        : errMsg
    }`)
  }, [])

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    setLoading(true)

    try {
      const resp = await http.post<MilkiResponse>(
        '/api/v1/user/sign-up',
        {
          username: data.username.toLocaleLowerCase(),
          password: data.password,
        },
      )
      if (resp.data.status === 'error') {
        return onRequestError(
          resp.data.errMsg ?? t('sign-page.unknown-err-msg'),
        )
      }
      toast.success(t('sign-page.sign-up-success'))
      navigate(`/login?user=${encodeURIComponent(data.username)}`)
    }
    catch (err) {
      const errMsg = String(err)
      onRequestError(errMsg)
    }
    finally {
      setLoading(false)
    }
  }

  const handleGoSignUp = useEventCallback(() => {
    navigate('/login')
  }, [])

  return (
    <div className='
      w-screen h-screen bg-base-200 dark:bg-base-100
      flex flex-col items-center justify-center
    '>
      <div className="card w-96 bg-base-100/50 dark:bg-neutral shadow-xl">
        <form className="card-body items-center text-center">
          <div className='flex items-center'>
            <img className='w-6' src='/milki-icon.svg' alt='Milki Logo' />
            <div className='ml-2 text-lg font-bold font-mono'>MILKI</div>
            <div className="divider divider-horizontal" />
            <h2 className="card-title">{t('sign-page.title-sign-up')}</h2>
          </div>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">{t('sign-page.label-user-name')}</span>
              <span className="label-text-alt text-secondary">{t('sign-page.case-insensitive-tip')}</span>
            </label>
            <input
              type="text"
              placeholder={t('sign-page.placeholder-user-name')}
              className={clsx(
                'input input-sm input-bordered w-full max-w-xs',
                errors.username && 'input-error',
              )}
              {...register('username', USERNAME_FORM_FIELD_VALIDATION)}
            />
            {
              errors.username && (
                <label className="label text-left">
                  <span className="label-text-alt text-error">{
                    t('sign-page.login-user-name-format-err-msg')
                  }</span>
                </label>
              )
            }
          </div>

          <div className="form-control w-full max-w-xs mt-2 mb-8">
            <label className="label">
              <span className="label-text">{t('sign-page.label-password')}</span>
            </label>
            <input
              type="password"
              placeholder={t('sign-page.placeholder-password')}
              className={clsx(
                'input input-sm input-bordered w-full max-w-xs',
                errors.password && 'input-error',
              )}
              {...register('password', PASSWORD_FORM_FIELD_VALIDATION)}
            />
            {
              errors.password && (
                <label className="label text-left">
                  <span className="label-text-alt text-error">{
                    t('sign-page.login-password-format-err-msg')
                  }</span>
                </label>
              )
            }
          </div>

          <div className="card-actions justify-end">
            <button
              type='submit'
              className="btn btn-sm btn-primary"
              onClick={handleSubmit(onSubmit)}
            >
              {
                isLoading
                  ? <span className="loading loading-bars loading-md" />
                  : t('sign-page.submit')
              }
            </button>
            <button
              className="btn btn-sm btn-ghost"
              onClick={handleGoSignUp}
            >
              {t('sign-page.go-login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
