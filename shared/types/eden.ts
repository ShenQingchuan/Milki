export type UpsertDocResponse =
  | { type: 'create'; id: string }
  | { type: 'update' }

export interface DocumentBaseEden {
  id: string
  title: string
  json: string
  markdown: string
  createdAt: Date
  updatedAt: Date
}

export interface GetDocDataByIdResponse {
  doc: DocumentBaseEden
}

export type GetRecentDocEden = (DocumentBaseEden & {
  owner: { name: string }
})

export interface GetRecentDocsResponse {
  docs: GetRecentDocEden[]
}
