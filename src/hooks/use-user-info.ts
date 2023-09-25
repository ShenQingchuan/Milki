import useSwr from 'swr'
import { useNavigate } from 'react-router-dom'
import type { Response } from 'redaxios'
import { httpGetFetcher, withTimeMinCost } from '../utils/fetcher'
import type { IUserSchema } from '../../server/src/schemas'
import type { MilkiResponse } from '../../shared/types'
import { ErrCodes } from '../../shared/constants'
import { useAuthorized } from './use-authorized'

export function useUserInfo() {
  const navigate = useNavigate()
  const { setAuthToken } = useAuthorized()

  const { data, error, isLoading } = useSwr<MilkiResponse<{
    user: IUserSchema
  }>>(
    '/api/v1/user/info',
    withTimeMinCost(800, httpGetFetcher),
    {
      onErrorRetry: (err, _key, _config, revalidate, { retryCount }) => {
        const { errCode } = (err as Response<MilkiResponse>).data
        if (errCode === ErrCodes.NOT_AUTHENTICATED) {
          setAuthToken(undefined)
          return navigate('/login?action=redirect')
        }

        setTimeout(() => revalidate({ retryCount }), 5000)
      },
    },
  )

  return {
    user: data?.data.user,
    isLoading,
    isError: error,
  }
}
