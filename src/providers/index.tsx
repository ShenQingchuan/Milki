import type { ComponentType, FC, PropsWithChildren, ReactNode } from 'react'
import { cloneElement } from 'react'
import { useRefValue } from '../hooks'
import { DarkModeContexts } from './dark-mode'

export const ProviderComposer: FC<{
  contexts: JSX.Element[]
} & PropsWithChildren> = ({ contexts, children }) => {
  return contexts.reduceRight((kids: any, parent: any) => {
    return cloneElement(parent, { children: kids })
  }, children)
}

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const contexts = useRefValue(() => [
    ...DarkModeContexts,
  ])

  return (
    <ProviderComposer contexts={contexts}>
      {children}
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
