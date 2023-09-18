import type { Elysia } from 'elysia'
import { userSignUpService } from '../services/user-sign-up'

// For `app.group('/v1')`
export function apiVersion1(app: Elysia) {
  return app
    .use(userSignUpService)
}
