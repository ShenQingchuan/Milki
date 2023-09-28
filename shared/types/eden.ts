export type UpsertDocResponse =
  | { type: 'create'; id: string }
  | { type: 'update' }

export interface GetDocDataByIdResponse {
  doc: {
    id: string
    title: string
    markdown: string
    createdAt: Date
    updatedAt: Date
  }
}
