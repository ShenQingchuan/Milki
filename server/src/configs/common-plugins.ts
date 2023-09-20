import { t } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'

export const cookiePlugin = cookie()
export const jwtPlugin = jwt({
  name: 'jwt',
  secret: Bun.env.MILKI_SECRET_KEY ?? 'milki-secret-key',
  exp: '1d',
  schema: t.Object({
    id: t.String(),
  }),
})
