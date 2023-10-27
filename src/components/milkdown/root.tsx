import type { FC, RefObject } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { useImperativeHandle } from 'react'
import { Milkdown } from '@milkdown/react'
import { editorViewCtx, parserCtx } from '@milkdown/core'
import { Slice } from '@milkdown/prose/model'
import type { MilkdownRef, UseMilkdownEditorOptions } from '../../utils/types'
import { useIsDark, useMilkdownEditor, useMilkdownSetup, useTranslator } from '../../hooks'
import { MilkdownSummaryProvider } from './provider'

interface MilkdownSummaryProps {
  defaultContent: string
  milkdownRef: RefObject<MilkdownRef>
  options: UseMilkdownEditorOptions
}

export function MilkdownSummary({
  defaultContent,
  milkdownRef,
  options,
}: MilkdownSummaryProps) {
  const { loading, get } = useMilkdownEditor(
    defaultContent,
    options,
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

export const MilkdownRoot: FC = () => {
  const isDark = useIsDark()
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
        <div className='flex-1 max-w-[50vw]'>
          <MilkdownSummary
            defaultContent={markdownContent}
            milkdownRef={milkdownRef}
            options={{
              isEditable: true,
              onChange: onMilkdownChange,
              onProseStateChange,
              onMilkdownFocus,
              onMilkdownBlur,
            }}
          />
        </div>
        <div className='flex-1 max-w-[50vw]'>
          <MonacoEditor
            className='w-full h-[calc(100vh-64px)]'
            height="100%"
            language="markdown"
            theme={
              isDark
                ? 'vs-dark'
                : 'light'
            }
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
