export interface MilkiResponse {
  status: 'success' | 'error'
  errCode: number
  data: Record<string, any> | Array<any> | null

  errMsg?: string
}
