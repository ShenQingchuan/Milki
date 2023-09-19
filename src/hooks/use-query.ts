import { useLocation } from 'react-router-dom'
import qs from 'query-string'

export function useQuery<T = Record<string, string>>(): T {
  const { search } = useLocation()
  return (qs.parse(search) as unknown) as T
}
