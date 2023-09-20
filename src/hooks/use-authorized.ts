import { useLocalStorageState } from 'ahooks'

export function useAuthorized() {
  const [authToken, setAuthToken] = useLocalStorageState<string | undefined>(
    'MILKI_AUTH_TOKEN',
    { defaultValue: undefined },
  )

  const isAuthorized = !!authToken
  return {
    isAuthorized,
    authToken,
    setAuthToken,
  }
}
