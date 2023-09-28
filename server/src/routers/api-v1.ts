import type { Elysia } from 'elysia'
import {
  docServices,
  userServices,
} from '../services'

export function apiVersion1(app: Elysia) {
  return app
    .group(
      '/v1',
      app => app
        .use(userServices)
        .use(docServices),
    )
}
