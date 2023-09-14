import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

type JsonData = Record<string, any>

export const proseStateContext = createContext<[
  proseState: JsonData,
  setProseState: Dispatch<SetStateAction<JsonData>>,
]>([{}, () => {}])

export const useProseStateContext = () => useContext(proseStateContext)

export const ProseStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useState({})
  return (
    <proseStateContext.Provider value={ctx}>
      {children}
    </proseStateContext.Provider>
  )
}
