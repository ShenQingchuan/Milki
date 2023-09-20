import type { Context } from 'elysia'
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

export function MilkiClientError(
  set: Context['set'],
) {
  set.status = 400
  return (
    ...args: Parameters<typeof MilkiError>
  ) => MilkiError(...args)
}
