import type { Elysia } from 'elysia'
import { t } from 'elysia'
import { ErrCodes } from '../../../shared/constants'
import { DocumentModel } from '../schemas/docs'
import { MilkiClientError, MilkiSuccess } from '../utils/response'
import { authenticationMiddleware } from '../middlewares/authentication'

const createDocSchema = t.Object({
  id: t.Optional(t.String()),
  title: t.Optional(t.String()),
  json: t.Optional(t.String()),
  markdown: t.Optional(t.String()),
})

function docUpsertService(app: Elysia) {
  return app
    .use(authenticationMiddleware)
    .post(
      '/upsert',
      async ({ set, body, user }) => {
        const { id, title, json, markdown } = body

        if (!user) {
          return MilkiClientError(set)(
            ErrCodes.USER_NOT_FOUND,
            'user-not-found',
          )
        }

        // If `id` exists, and can find a corresponding document, update it
        if (id) {
          const doc = await DocumentModel.findById(id)
          if (!doc) {
            return MilkiClientError(set)(
              ErrCodes.DOCUMENT_NOT_FOUND,
              'doc-not-found',
            )
          }

          // Update document
          try {
            await doc.updateOne({
              title,
              json,
              markdown,
            })
            return MilkiSuccess()
          }
          catch (err) {
            return MilkiClientError(set)(
              ErrCodes.DOCUMENT_UPDATE_ERROR,
              'doc-update-error',
              null, String(err),
            )
          }
        }

        // Otherwise, create a new document.
        try {
          await DocumentModel.create({
            title: title ?? '',
            json: json ?? '',
            markdown: markdown ?? '',
            owner: user._id,
          })
          return MilkiSuccess()
        }
        catch (err) {
          return MilkiClientError(set)(
            ErrCodes.DOCUMENT_CREATE_ERROR,
            'doc-create-error',
            null, String(err),
          )
        }
      },
      {
        body: createDocSchema,
      },
    )
}

export function docServices(app: Elysia) {
  return app
    .group(
      '/docs',
      app => app
        .use(docUpsertService),
    )
}
