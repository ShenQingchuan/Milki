import type { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthorized } from '../../hooks/use-authorized'

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
  const { isAuthorized } = useAuthorized()

  return (
    isAuthorized
      ? <Navigate to='/' replace />
      : renderElement
  )
}
