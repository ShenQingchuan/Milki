import type { Elysia } from 'elysia'
import { t } from 'elysia'

const signUpReqBodySchema = t.Object({
  username: t.String(),
  password: t.String(),
})

export function userSignUpService(app: Elysia) {
  return app
    .post(
      '/sign-up',
      ({ body }) => {

      },
      {
        body: signUpReqBodySchema,
      },
    )
}
