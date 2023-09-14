import { katexOptionsCtx } from '@milkdown/plugin-math'
import { useCallback } from 'react'
import type { FC } from 'react'
import katex from 'katex'
import type { CustomRenderFn } from './custom-render-block'
import { CustomRenderBlock } from './custom-render-block'

export const MathBlock: FC = () => {
  const katexRender: CustomRenderFn = useCallback((
    code,
    previewPanel,
    getEditor,
  ) => {
    if (!previewPanel.current) {
      return
    }

    try {
      katex.render(
        code,
        previewPanel.current,
        getEditor().ctx.get(katexOptionsCtx.key),
      )
    }
    catch (err) {
      console.error('[Milkdown] render error:', err)
    }
  }, [])

  return (<CustomRenderBlock customRender={katexRender} />)
}
