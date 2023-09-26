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
