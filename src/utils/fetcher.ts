import http from 'redaxios'

export const $http = http.create({
  withCredentials: true,
})

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
  return $http
    .get<D>(url)
    .then(res => res.data)
}
