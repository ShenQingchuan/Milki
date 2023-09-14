import type { Ctx } from '@milkdown/ctx'
import { editorViewOptionsCtx } from '@milkdown/core'

import '@milkdown/prose/view/style/prosemirror.css'
import '@milkdown/prose/tables/style/tables.css'
import 'prism-themes/themes/prism-nord.css'

import '../styles/mori-editor-theme.scss'

export function moriTheme(ctx: Ctx): void {
  ctx.update(editorViewOptionsCtx, (prev) => {
    const prevClass = prev.attributes

    return ({
      ...prev,
      attributes: (state) => {
        const attrs = typeof prevClass === 'function' ? prevClass(state) : prevClass

        return {
          ...attrs,
          class: [
            'prose dark:prose-invert outline-none',
            attrs?.class || '',
            'milkdown-theme-mori',
          ].join(' '),
        }
      },
    })
  })
}
