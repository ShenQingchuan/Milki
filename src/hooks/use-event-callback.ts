import { useCallback, useEffect, useRef } from 'react'

export function useEventCallback<T extends (...args: any[]) => any>(
  fn: T,
  deps: any[],
) {
  const callbackRef = useRef<T>(fn)

  useEffect(
    () => {
      callbackRef.current = fn
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn, ...deps],
  )

  return useCallback((...args: Parameters<T>) => {
    const fn = callbackRef.current
    return fn(...args)
  }, [callbackRef])
}
