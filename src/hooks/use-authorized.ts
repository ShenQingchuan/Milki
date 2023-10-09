import { useLocalStorageState } from 'ahooks'
import { useMemo } from 'react'

export function useAuthorized() {
  const [authToken, setAuthToken] = useLocalStorageState<string | undefined>(
    'MILKI_AUTH_TOKEN',
    { defaultValue: undefined },
  )

  const isAuthorized = useMemo(() => !!authToken, [authToken])
  return {
    isAuthorized,
    authToken,
    setAuthToken,
  }
}
