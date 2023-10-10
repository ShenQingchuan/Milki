import { MilkdownProvider } from '@milkdown/react'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import { compose } from '../../providers'

export const MilkdownSummaryProvider = compose(
  MilkdownProvider,
  ProsemirrorAdapterProvider,
)
