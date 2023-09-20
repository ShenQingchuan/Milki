export interface MilkiResponse<
  T extends
  | Record<string, any>
  | Array<any>
  | null = Record<string, any> | null,
> {
  status: 'success' | 'error'
  errCode: number
  data: T

  errMsg?: string
}
