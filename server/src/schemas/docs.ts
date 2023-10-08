import type { Document, InferSchemaType } from 'mongoose'
import { Schema, model } from 'mongoose'

const documentSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  json: {
    type: String,
    default: '',
  },
  markdown: {
    type: String,
    default: '',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  collaborators: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
}, {
  timestamps: true,
})

export type IDocumentSchema = InferSchemaType<typeof documentSchema> & Document
export const DocumentModel = model('Document', documentSchema)

const recentAccessedDocSchema = new Schema({
  doc: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
})

export type IRecentAccessedDocSchema = InferSchemaType<typeof recentAccessedDocSchema> & Document
export const RecentAccessedDocModel = model('RecentAccessedDoc', recentAccessedDocSchema)
