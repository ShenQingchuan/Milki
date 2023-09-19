import type { RefObject } from 'react'
import MonacoEditor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Milkdown, MilkdownProvider } from '@milkdown/react'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import { editorViewCtx, parserCtx } from '@milkdown/core'
import { Slice } from '@milkdown/prose/model'
import { decompressFromBase64 as decode } from 'lz-string'
import clsx from 'clsx'
import type { MilkdownRef } from '../../utils/types'
import { compose } from '../../providers'
import { ProseStateProvider } from '../../providers/prose'
import { useEventCallback, useMilkdownEditor, useTranslator } from '../../hooks'

type InferRefObject<T> = T extends RefObject<infer R> ? R : never

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
  const milkdownTabs = useRef({
    wysiwyg: t('milkdown.editor-tab-name.wysiwyg'),
    raw: t('milkdown.editor-tab-name.raw-code'),
  } as const)

  const [markdownContent, setMarkdownContent] = useState('')
  const [milkdownTab, setMilkdownTab] = useState<keyof InferRefObject<typeof milkdownTabs>>('wysiwyg')

  const handleClickTab = useEventCallback((tabKey) => {
    return useEventCallback(() => {
      setMilkdownTab(tabKey)
    }, [])
  }, [])

  const handleMonacoDidMount = useEventCallback((
    editor: editor.IStandaloneCodeEditor,
  ) => {
    monacoRef.current = editor
  }, [])

  useEffect(() => {
    const [_, search = ''] = window.location.href.split('?')
    const searchParams = new URLSearchParams(search)
    const text = searchParams.get('text')
    if (text) {
      setMarkdownContent(decode(text))
    }
  }, [])

  const onMarkdownChange = useEventCallback((markdown: string | undefined) => {
    setMarkdownContent(markdown ?? '')
  }, [])

  return (
    <MilkdownSummaryProvider>
      <div className='flex flex-col'>
        <div className="tabs">
          {
            Object.entries(milkdownTabs.current).map(([key, value]) => (
              <a
                key={key}
                className={`tab tab-bordered ${milkdownTab === key ? 'tab-active' : ''}`}
                onClick={handleClickTab(key as keyof InferRefObject<typeof milkdownTabs>)}
              >
                {value}
              </a>
            ))
          }
        </div>
        <div className={clsx(
          milkdownTab === 'wysiwyg' ? 'flex-1' : 'hidden',
        )}>
          <MilkdownSummary
            defaultContent={''}
            milkdownRef={milkdownRef}
            onMarkdownChange={onMarkdownChange}
          />
        </div>
        <div className={clsx(
          milkdownTab === 'raw' ? 'flex-1' : 'hidden',
        )}>
          <MonacoEditor
            className='
              min-w-[600px]
              min-h-[600px]
            '
            height="100%"
            language="markdown"
            theme="vs-dark"
            value={markdownContent}
            onChange={onMarkdownChange}
            onMount={handleMonacoDidMount}
          />
        </div>
      </div>
    </MilkdownSummaryProvider>
  )
}
