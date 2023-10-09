import type { Elysia } from 'elysia'
import { t } from 'elysia'
import { ErrCodes } from '../../../shared/constants'
import { DocumentModel, RecentAccessedDocModel } from '../schemas/docs'
import { MilkiClientError, MilkiSuccess } from '../utils/response'
import { authenticationBeforeHandler, authenticationMiddleware } from '../middlewares/authentication'
import type { GetDocDataByIdResponse, GetRecentDocEden, GetRecentDocsResponse } from '../../../shared/types/eden'

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

            // Record this update as a activity into `RecentAccessedDocModel`
            await RecentAccessedDocModel.updateOne(
              { user: user!._id, doc: doc._id },
              { updatedAt: new Date() },
              { upsert: true },
            )

            return MilkiSuccess({
              type: 'update',
            })
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
          const newDoc = await DocumentModel.create({
            title: title ?? '',
            json: json ?? '',
            markdown: markdown ?? '',
            owner: user!._id,
          })

          // Record this creation as a activity into `RecentAccessedDocModel`
          await RecentAccessedDocModel.updateOne(
            { user: user!._id, doc: newDoc._id },
            { updatedAt: new Date() },
            { upsert: true },
          )

          return MilkiSuccess({
            type: 'create',
            id: newDoc._id,
          })
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
        beforeHandle: [authenticationBeforeHandler],
      },
    )
}

function docsGetDataByIdService(app: Elysia) {
  return app
    .use(authenticationMiddleware)
    .get(
      '/data-by-id',
      async ({ set, query, user }) => {
        const { id } = query

        try {
          const foundDoc = await DocumentModel.findOne({ _id: id, owner: user!._id })
          if (!foundDoc) {
            return MilkiClientError(set)(
              ErrCodes.DOCUMENT_NOT_FOUND,
              'doc-not-found',
            )
          }

          // Record this access as a activity into `RecentAccessedDocModel`
          await RecentAccessedDocModel.updateOne(
            { user: user!._id, doc: foundDoc._id },
            { updatedAt: new Date() },
            { upsert: true },
          )

          return MilkiSuccess<GetDocDataByIdResponse>({
            doc: {
              id: foundDoc.id,
              title: foundDoc.title,
              json: foundDoc.json,
              markdown: foundDoc.markdown,
              createdAt: foundDoc.createdAt,
              updatedAt: foundDoc.updatedAt,
            },
          })
        }
        catch (err) {
          return MilkiClientError(set)(
            ErrCodes.DOCUMENT_NOT_FOUND,
            'doc-not-found',
            null, String(err),
          )
        }
      },
      {
        query: t.Object({
          id: t.String(),
        }),
        beforeHandle: [authenticationBeforeHandler],
      },
    )
}

function docsGetDataByUserService(app: Elysia) {
  return app
    .use(authenticationMiddleware)
    .get(
      '/data-by-my-recent',
      async ({ set, query, user }) => {
        // Return at most 10 documents at once,
        // and fetch from DB by page number and sort by `updatedAt` in descending order.
        const { page = 0 } = query

        // Read from `RecentAccessedDocModel` to get the recent accessed documents
        // and aggregate them into an array of `DocumentModel` instances.
        try {
          const recentAccessedDocs = await RecentAccessedDocModel
            .find({ user: user!._id })
            .sort({ updatedAt: -1 })
            .skip(page * 10)
            .limit(10)

          const docs = await Promise.all(recentAccessedDocs.map(async (recentDoc) => {
            // Find the document instance and
            // also query linked its owner `UserModel` instance with user's data
            const doc = await DocumentModel
              .findById(recentDoc.doc)
              .populate<{ owner: { name: string } }>('owner', 'name')

            if (!doc) {
              return null
            }

            return {
              id: doc.id,
              title: doc.title,
              json: doc.json,
              markdown: doc.markdown,
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              owner: doc.owner,
            }
          }))

          return MilkiSuccess<GetRecentDocsResponse>({
            docs: docs.filter(Boolean) as GetRecentDocEden[],
          })
        }
        catch (err) {
          return MilkiClientError(set)(
            ErrCodes.USER_RECENT_DOCUMENTS_QUERY_ERROR,
            'recent-docs-not-found',
            null, String(err),
          )
        }
      },
      {
        query: t.Object({
          page: t.Optional(t.Number()),
        }),
        beforeHandle: [authenticationBeforeHandler],
      },
    )
}

export function docServices(app: Elysia) {
  return app
    .group(
      '/docs',
      app => app
        .use(docsGetDataByUserService)
        .use(docsGetDataByIdService)
        .use(docUpsertService),
    )
}
