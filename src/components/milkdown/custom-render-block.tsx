import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FC, PropsWithChildren, RefObject } from 'react'
import { useNodeViewContext } from '@prosemirror-adapter/react'
import { useInstance } from '@milkdown/react'
import type { Editor } from '@milkdown/core'
import { useEventCallback, useTranslator } from '../../hooks'

export type CustomRenderFn = (
  code: string,
  previewPanel: RefObject<HTMLElement>,
  getEditor: () => Editor,
) => void | Promise<void>

export interface CustomRenderBlockProps {
  customRender: CustomRenderFn
}

export const CustomRenderBlock: FC<PropsWithChildren<CustomRenderBlockProps>> = ({ customRender, children }) => {
  const { node, setAttrs, selected } = useNodeViewContext()
  const [loading, getEditor] = useInstance()
  const code = useMemo(() => node.attrs.value, [node.attrs.value])
  const t = useTranslator()
  const previewTab = useMemo(() => t('milkdown.math-block-preview-tab-title'), [t])
  const codeTab = useMemo(() => t('milkdown.math-block-code-tab-title'), [t])
  const [activeTab, setActiveTab] = useState(codeTab)

  const editPanelRef = useRef<HTMLTextAreaElement>(null)
  const previewPanelRef = useRef<HTMLDivElement>(null)

  const handleUpdate = useEventCallback(() => {
    setAttrs({ value: editPanelRef.current?.value || '' })
  }, [])

  const onSelectTab = useCallback((tabName: string) => {
    return () => {
      if (
        activeTab === codeTab
        && tabName === previewTab
      ) {
        handleUpdate()
      }

      setActiveTab(tabName)
    }
  }, [activeTab, codeTab, handleUpdate, previewTab])

  useEffect(() => {
    requestAnimationFrame(() => {
      if (
        activeTab !== previewTab
        || loading
      ) {
        return
      }

      customRender(
        code,
        previewPanelRef,
        getEditor,
      )
    })
  }, [code, activeTab, loading, previewTab, customRender, getEditor])

  return (
    <div
      contentEditable={false}
      className={clsx(
        'flex flex-col p-2 my-2 min-h-[12rem] rounded',
        selected ? 'ring-2 ring-offset-2' : '',
        'bg-[#e7e7e7e0] dark:bg-[#232323e0]',
      )}
    >
      <div className='flex items-center ml-4'>
        <div className="tabs">
          {[previewTab, codeTab].map(tabName => (
            <a
              key={tabName}
              onClick={onSelectTab(tabName)}
              className={clsx(
                'tab tab-bordered',
                activeTab === tabName ? 'tab-active' : '',
              )}
            >
              {tabName}
            </a>
          ))}
        </div>
      </div>

      <div
        className={clsx(
          'flex flex-col items-center py-3 text-center h-auto',
          activeTab === previewTab ? '' : 'hidden',
        )}
        ref={previewPanelRef}
      >
        {children}
      </div>
      <textarea
        ref={editPanelRef}
        onChange={handleUpdate}
        defaultValue={code}
        className={clsx(
          'textarea textarea-bordered textarea-md',
          'w-full h-full flex-1 font-mono mt-2 rounded',
          activeTab === codeTab ? '' : 'hidden',
        )}
      />
    </div>
  )
}
