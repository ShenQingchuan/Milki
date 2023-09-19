import type { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface AuthGuardedRouteProps {
  render: JSX.Element
}

const AuthGuardedRoute: FC<AuthGuardedRouteProps> = ({
  render: renderElement,
}) => {
  const isAuthorized = false // TODO: implement authorization

  return (
    isAuthorized
      ? renderElement
      : <Navigate to='/login' replace />
  )
}

export default AuthGuardedRoute
