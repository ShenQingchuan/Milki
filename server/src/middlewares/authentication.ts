import type { Context, Elysia } from 'elysia'
import type { IUserSchema } from '../schemas'
import { UserModel } from '../schemas'
import { cookiePlugin, jwtPlugin } from '../configs/common-plugins'

export interface AuthenticationMiddlewareResult {
  user: IUserSchema | null
}

export function makeAuthenticationResult(set: Context['set'],
  user: IUserSchema | null = null): AuthenticationMiddlewareResult {
  if (!user) {
    set.status = 401
  }
  return { user }
}

export function authenticationMiddleware(app: Elysia) {
  return app
    .use(cookiePlugin)
    .use(jwtPlugin)
    .derive(async ({ cookie, jwt, set }) => {
      if (!cookie.MILKI_AUTH_TOKEN) {
        return makeAuthenticationResult(set)
      }

      const verifyResult = await jwt.verify(cookie.MILKI_AUTH_TOKEN)
      if (!verifyResult) {
        return makeAuthenticationResult(set)
      }

      const { id } = verifyResult
      const user = await UserModel.findById(id)
      if (!user) {
        return makeAuthenticationResult(set)
      }

      return makeAuthenticationResult(set, user)
    })
}
