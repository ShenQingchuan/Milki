import type { Elysia } from 'elysia'
import { userServices } from '../services'
import { docServices } from '../services/docs'

export function apiVersion1(app: Elysia) {
  return app
    .group(
      '/v1',
      app => app
        .use(userServices)
        .use(docServices),
    )
}
