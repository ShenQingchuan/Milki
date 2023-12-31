import { useRef } from 'react'

// @see https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
export function useRefValue<T>(value: () => T): T {
  const ref = useRef<T>()

  if (!ref.current)
    ref.current = value()

  return ref.current as T
}
