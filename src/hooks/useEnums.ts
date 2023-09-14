import { useState } from 'react'

export function useEnums<T = any, A extends T[] = T[]>(
  enumTuples: A,
  initValue: A[number] = enumTuples[0],
) {
  const [currentEnum, setCurrentEnum] = useState<A[number]>(initValue)
  return [currentEnum, setCurrentEnum] as const
}
