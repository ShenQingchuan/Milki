import type { Context } from 'elysia'
import type { MilkiResponse } from '../../../shared/types'

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
  data: MilkiResponse['data'] = null,
): MilkiResponse {
  return {
    status: 'error',
    errCode,
    errMsg,
    data,
  }
}

export function MilkiClientError(
  set: Context['set'],
  status = 400,
) {
  set.status = status
  return (
    ...args: Parameters<typeof MilkiError>
  ) => MilkiError(...args)
}
