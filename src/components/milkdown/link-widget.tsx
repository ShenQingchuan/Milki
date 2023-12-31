import { commandsCtx, editorViewCtx } from '@milkdown/core'
import { updateLinkCommand } from '@milkdown/preset-commonmark'
import { Plugin, TextSelection } from '@milkdown/prose/state'
import { DecorationSet } from '@milkdown/prose/view'
import { useInstance } from '@milkdown/react'
import { $prose } from '@milkdown/utils'
import type { useWidgetViewFactory } from '@prosemirror-adapter/react'
import { useWidgetViewContext } from '@prosemirror-adapter/react'
import { useCallback } from 'react'
import type { FC, KeyboardEvent } from 'react'

export const LinkWidgetBefore: FC = () => {
  return <span><wbr/></span>
}

export const LinkWidgetAfter: FC = () => {
  const { spec } = useWidgetViewContext()
  const [loading, getEditorInstance] = useInstance()
  const href = spec?.href ?? ''

  const onNavigateToLink = useCallback(() => {
    window.open(href, '_blank')
  }, [href])

  const onKeydownForInput = useCallback((e: KeyboardEvent) => {
    // Intercept Enter keydown event to
    // prevent editor from inserting a new line
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      getEditorInstance()?.action((ctx) => {
        const view = ctx.get(editorViewCtx)
        const { state } = view
        const { selection } = state
        const { $to } = selection
        const cursorPos = $to.end()
        const $sel = TextSelection.near(state.doc.resolve(cursorPos))
        view.dispatch(state.tr.setSelection($sel))
        view.focus()
      })
    }
  }, [getEditorInstance])

  return (
    <>
      <span
        className='ml-2 text-md cursor-pointer'
        onClick={onNavigateToLink}
      >
        <i className='i-ri-external-link-line' />
      </span>
      <span>&nbsp;</span>
      <input
        className='
          rounded border-none
          py-0 px-2 outline-none
          bg-neutral-100 dark:bg-neutral-900
        '
        size={href.length}
        placeholder="empty"
        onBlur={(e) => {
          if (loading)
            return
          getEditorInstance().action((ctx) => {
            const commands = ctx.get(commandsCtx)
            commands.call(updateLinkCommand.key, {
              href: e.target.value,
            })
          })
        }}
        onKeyDown={onKeydownForInput}
        type="text"
        defaultValue={href}
      />
      <span>&nbsp;&nbsp;</span>
    </>
  )
}

export function linkPlugin(widgetViewFactory: ReturnType<typeof useWidgetViewFactory>) {
  const before = widgetViewFactory({ as: 'span', component: LinkWidgetBefore })
  const after = widgetViewFactory({ as: 'span', component: LinkWidgetAfter })

  return $prose(
    () =>
      new Plugin({
        state: {
          init() {
            return DecorationSet.empty
          },
          apply(tr) {
            const { selection } = tr

            const { $from, $to } = selection
            const node = tr.doc.nodeAt(selection.from)
            const mark = node?.marks.find(mark => mark.type.name === 'link')

            if (!mark)
              return DecorationSet.empty

            let markPos = { start: -1, end: -1 }
            tr.doc.nodesBetween(
              $from.start(),
              $to.end(),
              (n, pos) => {
                if (node === n) {
                  markPos = {
                    start: pos,
                    end: pos + Math.max(n.textContent.length, 1),
                  }

                  // stop recursing if result is found
                  return false
                }
                return undefined
              },
            )

            return DecorationSet.create(tr.doc, [
              before(markPos.start),
              after(markPos.end, {
                href: mark.attrs.href,
                title: mark.attrs.title,
              }),
            ])
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
  )
}
