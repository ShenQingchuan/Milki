import { type FC, useCallback, useRef } from 'react'
import mermaid from 'mermaid'
import { useNodeViewContext } from '@prosemirror-adapter/react'
import { useIsDark } from '../../providers/dark-mode'
import { CustomRenderBlock, type CustomRenderFn } from './custom-render-block'

export const DiagramBlock: FC = () => {
  const { node } = useNodeViewContext()
  const id = node.attrs.identity
  const isDarkMode = useIsDark()
  const rendering = useRef(false)

  const mermaidRender: CustomRenderFn = useCallback(async (
    code,
    previewPanel,
  ) => {
    const container = previewPanel.current
    if (!container) {
      return
    }

    if (code.length === 0) {
      return
    }
    if (rendering.current) {
      return
    }

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDarkMode ? 'dark' : 'default',
      })
      rendering.current = true
      const { svg, bindFunctions } = await mermaid.render(id, code)
      rendering.current = false
      container.innerHTML = svg
      bindFunctions?.(container)
    }
    catch (err) {
      console.error('[Milkdown] render error:', err)
    }
  }, [])

  return (<CustomRenderBlock customRender={mermaidRender} />)
}
