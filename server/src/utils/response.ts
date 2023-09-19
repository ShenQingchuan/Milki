import type { MilkiResponse } from '../types'

export function MilkiSuccess(
  data:
  | Record<string, any>
  | Array<any> = {},
): MilkiResponse {
  return {
    status: 'success',
    errCode: 0,
    data,
  }
}

export function MilkiError(
  errCode: number,
  errMsg: string,
): MilkiResponse {
  return {
    status: 'error',
    errCode,
    errMsg,
    data: null,
  }
}
