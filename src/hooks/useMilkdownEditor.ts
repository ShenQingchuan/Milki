import { Editor, defaultValueCtx, rootCtx } from '@milkdown/core'
import { useEditor } from '@milkdown/react'
import { codeBlockSchema, commonmark, listItemSchema } from '@milkdown/preset-commonmark'
import { history } from '@milkdown/plugin-history'
import { prism } from '@milkdown/plugin-prism'
import { $view } from '@milkdown/utils'
import { useNodeViewFactory, usePluginViewFactory, useWidgetViewFactory } from '@prosemirror-adapter/react'
import { useEffect, useMemo } from 'react'
import { indent } from '@milkdown/plugin-indent'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { diagram, diagramSchema } from '@milkdown/plugin-diagram'
import { math, mathBlockSchema } from '@milkdown/plugin-math'
import { trailing } from '@milkdown/plugin-trailing'
import { cursor } from '@milkdown/plugin-cursor'
import debounce from 'lodash.debounce'
import type { Ctx, MilkdownPlugin } from '@milkdown/ctx'
import { gfm as githubPresets } from '@milkdown/preset-gfm'
import { moriTheme } from '../lib/milkdown-theme'
import { useProseStateContext } from '../providers/prose'
import { CodeBlock } from '../components/milkdown/code-block'
import { ListItem } from '../components/milkdown/list-item'
import { MathBlock } from '../components/milkdown/math-block'
import 'katex/dist/katex.min.css'
import { DiagramBlock } from '../components/milkdown/diagram-block'
import {
  TableTooltip,
  tableSelectorPlugin,
  tableTooltip,
  tableTooltipCtx,
} from '../components/milkdown/table-widget'

export function useMilkdownEditor(
  defaultValue: string,
  onMarkdownChange: (md: string) => void,
) {
  const nodeViewFactory = useNodeViewFactory()
  const pluginViewFactory = usePluginViewFactory()
  const widgetViewFactory = useWidgetViewFactory()
  const [, setProseState] = useProseStateContext()

  const githubPresetsPlugins: MilkdownPlugin[] = useMemo(() => {
    return [
      githubPresets,
      tableTooltip,
      tableTooltipCtx,
      (ctx: Ctx) => async () => {
        ctx.set(tableTooltip.key, {
          view: pluginViewFactory({
            component: TableTooltip,
          }),
        })
      },
      tableSelectorPlugin(widgetViewFactory),
    ].flat()
  }, [])

  const mathPlugins: MilkdownPlugin[] = useMemo(() => {
    return [
      $view(mathBlockSchema.node, () =>
        nodeViewFactory({
          component: MathBlock,
          stopEvent: () => true,
        }),
      ),
      math,
    ].flat()
  }, [nodeViewFactory])

  const diagramPlugins: MilkdownPlugin[] = useMemo(() => {
    return [
      diagram,
      $view(diagramSchema.node, () =>
        nodeViewFactory({
          component: DiagramBlock,
          stopEvent: () => true,
        }),
      ),
    ].flat()
  }, [nodeViewFactory])

  const editorInfo = useEditor(
    (root) => {
      return Editor.make()
        .enableInspector()
        .config(moriTheme)
        .config((ctx) => {
          ctx.set(rootCtx, root)
          ctx.set(defaultValueCtx, defaultValue)
        })
        .config((ctx) => {
          ctx
            .get(listenerCtx)
            .markdownUpdated((_, md) => {
              debounce(onMarkdownChange, 100)(md)
            })
            .updated((_, doc) => {
              const state = doc.toJSON()
              debounce(setProseState, 100)(state)
            })
        })
        // Tips: Orders matters!
        // - commonmark must be be front-loaded as much as possible
        .use(commonmark)
        .use(githubPresetsPlugins)
        .use(listener)
        .use(indent)
        .use(history)
        .use(cursor)
        .use(trailing)
        .use(prism)
        .use(mathPlugins)
        .use(diagramPlugins)
        .use($view(codeBlockSchema.node, () => nodeViewFactory({ component: CodeBlock })))
        .use($view(listItemSchema.node, () => nodeViewFactory({ component: ListItem })))
    },
    [defaultValue, onMarkdownChange],
  )

  useEffect(() => {
    onMarkdownChange(defaultValue)
  }, [defaultValue, onMarkdownChange])

  return editorInfo
}
