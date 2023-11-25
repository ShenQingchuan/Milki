import { memo, useCallback, useMemo } from 'react'
import type { MouseEventHandler } from 'react'
import clsx from 'clsx'
import { useNodeViewContext } from '@prosemirror-adapter/react'
import { toast } from 'react-hot-toast'
import { useEventCallback, useTranslator } from '../../hooks'
import { MARKDOWN_CODE_BLOCK_LANGS } from '../../utils/constants'

export const CodeBlock = memo(() => {
  const { view, contentRef, selected, node, setAttrs } = useNodeViewContext()
  const t = useTranslator()

  const isSelectLangDisabled = useMemo(() => {
    return !view.editable
  }, [view.editable])

  const onSelectLang = useCallback((lang: string) => {
    return () => {
      setAttrs({ language: lang })
    }
  }, [setAttrs])

  const copySuccessMsg = useMemo(() => t('milkdown.code-block-copied'), [t])
  const copyContent = useEventCallback<MouseEventHandler>((e) => {
    e.preventDefault()
    navigator.clipboard.writeText(node.textContent)
    toast.success(copySuccessMsg)
  }, [])

  return (
    <div
      className={clsx(
        selected ? 'ProseMirror-selectednode' : '',
        'not-prose my-6',
        'bg-[#e1e1e19c] dark:bg-[#5959599c]',
        'shadow rounded',
      )}
    >
      <div
        contentEditable={false}
        suppressContentEditableWarning
        className='mb-1 pt-2 px-4 flex justify-between items-center'
      >
        <button className={isSelectLangDisabled ? 'cursor-disabled' : 'dropdown'}>
          <label tabIndex={0} className={clsx('m-1 btn btn-sm', isSelectLangDisabled && 'cursor-not-allowed')}>
            {t('milkdown.code-block-lang-selector')} {node.attrs.language}
          </label>
          {!isSelectLangDisabled && <ul tabIndex={0} className="
            dropdown-content z-[1]
            menu menu-sm flex flex-col flex-nowrap
            p-2 shadow bg-base-100 rounded-box
            w-auto h-52 overflow-y-auto
          ">
            {
              MARKDOWN_CODE_BLOCK_LANGS.map((lang, idx) => (
                <li key={idx} onClick={onSelectLang(lang)}>
                  <a>{lang}</a>
                </li>
              ))
            }
          </ul>}
        </button>

        <button className="btn btn-sm" onClick={copyContent}>
          {t('milkdown.code-block-copy')}
        </button>
      </div>

      <pre
        spellCheck={false}
        className='text-sm overflow-x-auto py-2 px-4'
      >
        <code ref={contentRef} />
      </pre>
    </div>
  )
})
