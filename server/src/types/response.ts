export interface MilkiResponse<
  T extends
  | Record<string, any>
  | Array<any>
  | null = Record<string, any>,
> {
  status: 'success' | 'error'
  errCode: number
  data: T

  errMsg?: string
}
