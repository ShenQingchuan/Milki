import type { Context } from 'elysia'
import type { MilkiResponse } from '../../../shared/types'

export function MilkiSuccess<T extends (Record<string, any> | Array<any>)>(
  data?: T,
): MilkiResponse {
  return {
    status: 'success',
    errCode: 0,
    data: data ?? {},
  }
}

export function MilkiError(
  errCode: number,
  errMsg: string,
  data: MilkiResponse['data'] = null,
  errDetail?: string,
): MilkiResponse {
  return {
    status: 'error',
    errCode,
    errMsg,
    errDetail,
    data,
  }
}

export function MilkiClientError(
  setOrCallback: Context['set'] | (() => void),
  statusCode = 400,
) {
  if (typeof setOrCallback === 'function') {
    setOrCallback()
  }
  else {
    setOrCallback.status = statusCode
  }
  return (
    ...args: Parameters<typeof MilkiError>
  ) => MilkiError(...args)
}
