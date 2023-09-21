import http from 'redaxios'

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function withTimeMinCost<D = any>(
  minCost: number,
  fetcher: (url: string) => Promise<D>,
) {
  return async (url: string) => {
    const [resp] = await Promise.all([
      fetcher(url),
      timeout(minCost),
    ])
    return resp
  }
}

export function httpGetFetcher<D = any>(url: string) {
  return http
    .get<D>(url, {
      withCredentials: true,
    })
    .then(res => res.data)
}
