import type { Elysia } from 'elysia'
import { t } from 'elysia'
import { UserModel } from '../schemas'
import { MilkiError, MilkiSuccess } from '../utils/response'
import { ErrCodes } from '../constants'

const signUpReqBodySchema = t.Object({
  username: t.String(),
  password: t.String(),
})

function userSignUpService(app: Elysia) {
  return app
    .post(
      '/sign-up',
      async ({ body }) => {
        const { username, password } = body
        const passwdHash = await Bun.password.hash(password)
        try {
          await UserModel.create({
            name: username,
            password: passwdHash,
          })
        }
        catch (err) {
          return MilkiError(
            ErrCodes.USER_CREATE_ERROR,
            String(err),
          )
        }

        return MilkiSuccess()
      },
      {
        body: signUpReqBodySchema,
      },
    )
}

export function userServices(app: Elysia) {
  return app.group(
    '/user',
    app => app
      .use(userSignUpService),
  )
}
