import type { ComponentType, FC, PropsWithChildren, ReactNode } from 'react'
import { cloneElement } from 'react'
import { useRefValue } from '../hooks'
import { JotaiStoreProvider } from './jotai'
import { DarkModeProvider } from './dark-mode'

export const ProviderComposer: FC<{
  contexts: JSX.Element[]
} & PropsWithChildren> = ({ contexts, children }) => {
  return contexts.reduceRight((kids: any, parent: any) => {
    return cloneElement(parent, { children: kids })
  }, children)
}

export function Providers(props: PropsWithChildren) {
  return (
    <ProviderComposer
      contexts={
        useRefValue(() => [
          <JotaiStoreProvider key={'JotaiStoreProvider'} />,
          <DarkModeProvider key={'DarkModeProvider'} />,
        ])
      }
    >
      {props.children}
    </ProviderComposer>
  )
}

export function compose(...providers: ComponentType<{ children: ReactNode }>[]): ComponentType<{ children: ReactNode }> {
  return providers.reduce((Prev, Curr) => {
    const Component: FC<{ children: ReactNode }> = ({ children }) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    )
    Component.displayName = Prev.displayName

    return Component
  })
}
