import { type FC, useEffect, useState } from 'react'
import http from 'redaxios'
import { useNavigate } from 'react-router-dom'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import type { Response } from 'redaxios'
import type { MilkiResponse } from '../../shared/types'
import { useEventCallback, useTranslator } from '../hooks'
import { useQuery } from '../hooks/use-query'
import type { SignFormInputs } from '../utils/types'
import { PASSWORD_FORM_FIELD_VALIDATION, USERNAME_FORM_FIELD_VALIDATION } from '../utils/constants'
import { useAuthorized } from '../hooks/use-authorized'

export const LoginPage: FC = () => {
  const t = useTranslator()
  const navigate = useNavigate()
  const routeQuery = useQuery<{
    user?: string
    action?: string
  }>()
  const [isLoading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<SignFormInputs>()
  const { setAuthToken } = useAuthorized()

  const showErrToast = useEventCallback((errMsg: string) => {
    toast.error(`${
      t('sign-page.login-error-label')
    } - ${
      errMsg.length > 24
        ? `${errMsg.slice(0, 24)}...`
        : errMsg
    }`)
  }, [])

  const onSubmitLogin: SubmitHandler<SignFormInputs> = async (data) => {
    setLoading(true)

    try {
      const resp = await http.post<MilkiResponse<{ token: string }>>(
        '/api/v1/user/login',
        {
          username: data.username.toLocaleLowerCase(),
          password: data.password,
        },
      )
      toast.success(t('sign-page.login-success'))
      setAuthToken(resp.data.data.token)
      navigate('/')
    }
    catch (err) {
      const tipKey = (err as Response<MilkiResponse>).data.errMsg
      showErrToast(t(`sign-page.${tipKey}`))
    }
    finally {
      setLoading(false)
    }
  }

  const handleGoSignUp = useEventCallback(() => {
    navigate('/sign-up')
  }, [])

  useEffect(() => {
    if (routeQuery.action === 'redirect') {
      toast(
        t('sign-page.login-redirect-tip'),
        { id: 'login-redirect-tip', icon: '🤔' },
      )
    }
  }, [])

  return (
    <div className='
      w-screen h-screen bg-base-200 dark:bg-base-100
      flex flex-col items-center justify-center
    '>
      <div className="card w-96 bg-base-100/50 dark:bg-neutral shadow-xl">
        <form className="card-body items-center text-center">
          <div className='flex items-center'>
            <img className='w-6' src='/logo-icon.svg' alt='Milki Logo' />
            <div className='ml-2 text-lg font-bold font-mono'>
              {import.meta.env.VITE_APP_NAME}
            </div>
            <div className="divider divider-horizontal" />
            <h2 className="card-title">{t('sign-page.title-login')}</h2>
          </div>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">{t('sign-page.label-user-name')}</span>
              <span className="label-text-alt text-secondary">{t('sign-page.case-insensitive-tip')}</span>
            </label>

            <input
              type="text"
              defaultValue={routeQuery.user ?? ''}
              placeholder={t('sign-page.placeholder-user-name')}
              className="input input-sm input-bordered w-full max-w-xs"
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

          <div className="form-control w-full max-w-xs mt-2 mb-10">
            <label className="label">
              <span className="label-text">{t('sign-page.label-password')}</span>
            </label>
            <input
              type="password"
              placeholder={t('sign-page.placeholder-password')}
              className="input input-sm input-bordered w-full max-w-xs"
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
              onClick={handleSubmit(onSubmitLogin)}
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
                {t('sign-page.go-sign-up')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
