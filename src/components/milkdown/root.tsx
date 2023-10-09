import type { RefObject } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { useImperativeHandle } from 'react'
import { Milkdown, MilkdownProvider } from '@milkdown/react'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import { editorViewCtx, parserCtx } from '@milkdown/core'
import { Slice } from '@milkdown/prose/model'
import type { MilkdownRef, UseMilkdownEditorOptions } from '../../utils/types'
import { compose } from '../../providers'
import { useMilkdownEditor, useMilkdownSetup, useTranslator } from '../../hooks'

const MilkdownSummaryProvider = compose(
  MilkdownProvider,
  ProsemirrorAdapterProvider,
)

interface MilkdownSummaryProps {
  defaultContent: string
  milkdownRef: RefObject<MilkdownRef>
  options: UseMilkdownEditorOptions
}

function MilkdownSummary({
  defaultContent,
  milkdownRef,
  options,
}: MilkdownSummaryProps) {
  const {
    onChange,
    onProseStateChange,
    onMilkdownFocus,
    onMilkdownBlur,
  } = options
  const { loading, get } = useMilkdownEditor(
    defaultContent,
    {
      onChange,
      onProseStateChange,
      onMilkdownFocus,
      onMilkdownBlur,
    },
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

export function MilkdownRoot() {
  const t = useTranslator()
  const {
    milkdownRef,
    markdownContent,
    handleMonacoDidMount,
    onProseStateChange,
    onMonacoChange,
    onMilkdownChange,
    onMilkdownFocus,
    onMilkdownBlur,
  } = useMilkdownSetup()

  return (
    <MilkdownSummaryProvider>
      <div className='flex items-stretch'>
        <div className='flex-1'>
          <MilkdownSummary
            defaultContent={markdownContent}
            milkdownRef={milkdownRef}
            options={{
              onChange: onMilkdownChange,
              onProseStateChange,
              onMilkdownFocus,
              onMilkdownBlur,
            }}
          />
        </div>
        <div className='flex-1'>
          <MonacoEditor
            className='w-full h-[calc(100vh-64px)]'
            height="100%"
            language="markdown"
            theme="vs-dark"
            value={markdownContent}
            onChange={onMonacoChange}
            onMount={handleMonacoDidMount}
            loading={(
              <div className='flex flex-col items-center'>
                <div className="loading loading-ring loading-lg mb-2" />
                <div>{t('milkdown.loading-monaco')}</div>
              </div>
            )}
            options={{
              padding: { top: 18 },
            }}
          />
        </div>
      </div>
    </MilkdownSummaryProvider>
  )
}
