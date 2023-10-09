import useSwr from 'swr'
import { useNavigate } from 'react-router-dom'
import type { Response } from 'redaxios'
import { useCallback } from 'react'
import { httpGetFetcher, withTimeMinCost } from '../utils/fetcher'
import type { IUserSchema } from '../../server/src/schemas'
import type { MilkiResponse } from '../../shared/types'
import { ErrCodes } from '../../shared/constants'
import { useAuthorized } from './use-authorized'

type FetchUserInfoResp = MilkiResponse<{ user: IUserSchema }>

export function useUserInfo() {
  const navigate = useNavigate()
  const { setAuthToken } = useAuthorized()

  const onFetchUserInfoErrCallback = useCallback((err: any) => {
    const { errCode } = (err as Response<MilkiResponse>).data
    if (errCode === ErrCodes.NOT_AUTHENTICATED) {
      setAuthToken()
      // return navigate('/login?action=redirect')
    }
  }, [navigate, setAuthToken])

  const { data, error, isLoading } = useSwr<FetchUserInfoResp>(
    '/api/v1/user/info',
    withTimeMinCost(800, httpGetFetcher),
    {
      shouldRetryOnError: false,
      onError: onFetchUserInfoErrCallback,
    },
  )

  return {
    user: data?.data.user,
    isLoading,
    isError: error,
  }
}
