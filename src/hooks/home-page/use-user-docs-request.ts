import useSwr from 'swr'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { httpGetFetcher, withTimeMinCost } from '../../utils/fetcher'
import type { GetRecentDocsResponse, MilkiResponse } from '../../../shared/types'
import { useTranslator } from '..'

type FetchUserDocsResp = MilkiResponse<GetRecentDocsResponse>

export function useMyRecentDocsRequest() {
  const t = useTranslator()
  const { data, error, isLoading } = useSwr<FetchUserDocsResp>(
    '/api/v1/docs/data-by-my-recent',
    withTimeMinCost(800, httpGetFetcher),
  )
  useEffect(() => {
    if (error) {
      const errToastKey = 'home-page.workbench.failed-to-fetch-docs'
      toast.error(
        t(errToastKey, {
          id: errToastKey,
          errDetail: error.message,
        }),
      )
    }
  }, [error])

  return {
    myRecentDocs: data?.data.docs ?? [],
    isLoading,
  }
}
