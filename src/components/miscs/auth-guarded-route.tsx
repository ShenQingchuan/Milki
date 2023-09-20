import type { FC } from 'react'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthorized } from '../../hooks/use-authorized'
import { useTranslator } from '../../hooks'

interface AuthGuardedRouteProps {
  render: JSX.Element
}

export const AuthGuardedRoute: FC<AuthGuardedRouteProps> = ({
  render: renderElement,
}) => {
  const { isAuthorized } = useAuthorized()

  return (
    isAuthorized
      ? renderElement
      : <Navigate to='/login' replace />
  )
}

export const ExcludeAuthGuardedRoute: FC<AuthGuardedRouteProps> = ({
  render: renderElement,
}) => {
  const t = useTranslator()
  const { isAuthorized } = useAuthorized()
  if (isAuthorized) {
    toast(t('already-authorized'), { icon: '💠' })
  }

  return (
    isAuthorized
      ? <Navigate to='/' replace />
      : renderElement
  )
}
