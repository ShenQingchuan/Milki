import useSwr from 'swr'
import { httpGetFetcher } from '../utils/fetcher'
import type { IUserSchema } from '../../server/src/schemas'
import type { MilkiResponse } from '../../server/src/types'

export function useUserInfo() {
  const { data, error, isLoading } = useSwr<MilkiResponse<{
    user: IUserSchema
  }>>(
    '/api/v1/user/info',
    httpGetFetcher,
  )

  return {
    user: data?.data.user,
    isLoading,
    isError: error,
  }
}
