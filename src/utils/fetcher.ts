import http from 'redaxios'

export function httpGetFetcher(url: string) {
  return http
    .get(url, {
      withCredentials: true,
    })
    .then(res => res.data)
}
