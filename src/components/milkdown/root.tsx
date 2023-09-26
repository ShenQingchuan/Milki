import type { RefObject } from 'react'
import MonacoEditor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { Milkdown, MilkdownProvider } from '@milkdown/react'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import { editorViewCtx, parserCtx } from '@milkdown/core'
import { Slice } from '@milkdown/prose/model'
import type { MilkdownRef } from '../../utils/types'
import { compose } from '../../providers'
import { ProseStateProvider } from '../../providers/prose'
import { useEventCallback, useMilkdownEditor, useTranslator } from '../../hooks'

const MilkdownSummaryProvider = compose(
  MilkdownProvider,
  ProsemirrorAdapterProvider,
  ProseStateProvider,
)

interface MilkdownSummaryProps {
  defaultContent: string
  milkdownRef: RefObject<MilkdownRef>
  onMarkdownChange: (markdown: string) => void
}

function MilkdownSummary({
  defaultContent,
  milkdownRef,
  onMarkdownChange,
}: MilkdownSummaryProps) {
  const { loading, get } = useMilkdownEditor(
    defaultContent,
    onMarkdownChange,
  )

  useImperativeHandle(milkdownRef, () => ({
    update: (markdown: string) => {
      if (loading)
        return
      const editor = get()
      editor?.action((ctx) => {
        const view = ctx.get(editorViewCtx)
        const parser = ctx.get(parserCtx)
        const doc = parser(markdown)
        if (!doc)
          return
        const state = view.state
        view.dispatch(
          state.tr.replace(
            0,
            state.doc.content.size,
            new Slice(doc.content, 0, 0),
          ),
        )
      })
    },
  }))

  return <Milkdown />
}

export const MilkdownRoot: React.FC = () => {
  const t = useTranslator()
  const milkdownRef = useRef<MilkdownRef>(null)
  const monacoRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const [markdownContent, setMarkdownContent] = useState('')

  const handleMonacoDidMount = useEventCallback((
    editor: editor.IStandaloneCodeEditor,
  ) => {
    monacoRef.current = editor
  }, [])

  const onMarkdownChange = useEventCallback((markdown: string | undefined) => {
    setMarkdownContent(markdown ?? '')
  }, [])

  return (
    <MilkdownSummaryProvider>
      <div className='flex items-center'>
        <div className='flex-1'>
          <MilkdownSummary
            defaultContent={''}
            milkdownRef={milkdownRef}
            onMarkdownChange={onMarkdownChange}
          />
        </div>
        <div className='flex-1'>
          <MonacoEditor
            className='w-full h-[calc(100vh-64px)]'
            height="100%"
            language="markdown"
            theme="vs-dark"
            value={markdownContent}
            onChange={onMarkdownChange}
            onMount={handleMonacoDidMount}
            loading={(
              <div className='flex flex-col items-center'>
                <div className="loading loading-ring loading-lg mb-2" />
                <div>{t('milkdown.loading-monaco')}</div>
              </div>
            )}
          />
        </div>
      </div>
    </MilkdownSummaryProvider>
  )
}
