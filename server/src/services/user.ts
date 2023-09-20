import type { Elysia } from 'elysia'
import { t } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'
import { UserModel } from '../schemas'
import { MilkiClientError, MilkiSuccess } from '../utils/response'
import { ErrCodes } from '../constants'
import {
  SIGN_UP_PASSWORD_MAX_LEN,
  SIGN_UP_PASSWORD_MIN_LEN,
  SIGN_UP_PASSWORD_PATTERN,
  SIGN_UP_USERNAME_MAX_LEN,
  SIGN_UP_USERNAME_MIN_LEN,
  SIGN_UP_USERNAME_PATTERN,
} from '../../../shared/constants'

const signReqBodySchema = t.Object({
  username: t.String({
    minLength: SIGN_UP_USERNAME_MIN_LEN,
    maxLength: SIGN_UP_USERNAME_MAX_LEN,
    pattern: SIGN_UP_USERNAME_PATTERN,
  }),
  password: t.String({
    minLength: SIGN_UP_PASSWORD_MIN_LEN,
    maxLength: SIGN_UP_PASSWORD_MAX_LEN,
    pattern: SIGN_UP_PASSWORD_PATTERN,
  }),
})

function userSignUpService(app: Elysia) {
  return app
    .post(
      '/sign-up',
      async ({ set, body }) => {
        const { username, password } = body
        const passwdHash = await Bun.password.hash(password)

        // Check if username exists
        const user = await UserModel.findOne({ name: username })
        if (user) {
          return MilkiClientError(set)(
            ErrCodes.USER_EXISTS,
            'sign-up-duplicate-username',
          )
        }

        try {
          await UserModel.create({
            name: username,
            password: passwdHash,
          })
        }
        catch (err) {
          return MilkiClientError(set)(
            ErrCodes.USER_CREATE_ERROR,
            'create-user-err-msg',
          )
        }

        return MilkiSuccess()
      },
      {
        body: signReqBodySchema,
      },
    )
}

function userLoginService(app: Elysia) {
  return app
    .use(cookie())
    .use(
      jwt({
        name: 'jwt',
        secret: Bun.env.MILKI_SECRET_KEY ?? 'milki-secret-key',
        exp: '1d',
      }),
    )
    .post(
      '/login',
      async ({ set, body, jwt, setCookie }) => {
        const { username, password } = body
        const user = await UserModel.findOne({ name: username })
        if (!user) {
          return MilkiClientError(set)(
            ErrCodes.LOGIN_USER_NOT_FOUND,
            'login-user-not-found',
          )
        }

        const passwdHash = user.password
        const isPasswdCorrect = await Bun.password.verify(password, passwdHash)
        if (!isPasswdCorrect) {
          return MilkiClientError(set)(
            ErrCodes.LOGIN_PASSWORD_INCORRECT,
            'login-password-incorrect',
          )
        }

        const token = await jwt.sign({ id: user._id.toString() })
        setCookie('MILKI_AUTH_TOKEN', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24, // 1 day
        })

        return MilkiSuccess({ token })
      },
      {
        body: signReqBodySchema,
      },
    )
}

export function userServices(app: Elysia) {
  return app.group(
    '/user',
    app => app
      .use(userSignUpService)
      .use(userLoginService),
  )
}
