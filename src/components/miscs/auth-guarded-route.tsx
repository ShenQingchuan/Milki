import type { FC } from 'react'
import { Login } from '../../pages/Login'

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
      : <Login />
  )
}

export default AuthGuardedRoute
