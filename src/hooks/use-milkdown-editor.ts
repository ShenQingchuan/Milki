import { Editor, defaultValueCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core'
import { useEditor } from '@milkdown/react'
import { codeBlockSchema, commonmark, listItemSchema } from '@milkdown/preset-commonmark'
import { history } from '@milkdown/plugin-history'
import { prism } from '@milkdown/plugin-prism'
import { $view } from '@milkdown/utils'
import { useNodeViewFactory, usePluginViewFactory, useWidgetViewFactory } from '@prosemirror-adapter/react'
import { useMemo } from 'react'
import debounce from 'lodash.debounce'
import { indent } from '@milkdown/plugin-indent'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { diagram, diagramSchema } from '@milkdown/plugin-diagram'
import { math, mathBlockSchema } from '@milkdown/plugin-math'
import { trailing } from '@milkdown/plugin-trailing'
import { cursor } from '@milkdown/plugin-cursor'
import { gfm as githubPresets } from '@milkdown/preset-gfm'
import type { Ctx, MilkdownPlugin } from '@milkdown/ctx'
import { moriTheme } from '../lib/milkdown-theme'
import { CodeBlock } from '../components/milkdown/code-block'
import { ListItem } from '../components/milkdown/list-item'
import { MathBlock } from '../components/milkdown/math-block'
import { DiagramBlock } from '../components/milkdown/diagram-block'
import { TableTooltip, tableSelectorPlugin, tableTooltip, tableTooltipCtx } from '../components/milkdown/table-widget'
import type { UseMilkdownEditorOptions } from '../utils/types'
import 'katex/dist/katex.min.css'
import { linkPlugin } from '../components/milkdown/link-widget'

export function useMilkdownEditor(
  defaultValue: string,
  {
    isEditable,
    onChange,
    onProseStateChange,
    onMilkdownFocus,
    onMilkdownBlur,
  }: UseMilkdownEditorOptions,
) {
  const nodeViewFactory = useNodeViewFactory()
  const pluginViewFactory = usePluginViewFactory()
  const widgetViewFactory = useWidgetViewFactory()

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
        .use(linkPlugin(widgetViewFactory))
        .use($view(codeBlockSchema.node, () => nodeViewFactory({ component: CodeBlock })))
        .use($view(listItemSchema.node, () => nodeViewFactory({ component: ListItem })))
        .config(moriTheme)
        .config((ctx) => {
          ctx.update(
            editorViewOptionsCtx,
            prev => ({
              ...prev,
              editable: () => isEditable,
            }),
          )
        })
        .config((ctx) => {
          ctx.set(rootCtx, root)
          ctx.set(defaultValueCtx, defaultValue)
        })
        .config((ctx) => {
          if (
            onChange
            && onProseStateChange
            && onMilkdownFocus
            && onMilkdownBlur
          ) {
            ctx
              .get(listenerCtx)
              .markdownUpdated((_, md) => {
                debounce(onChange, 300)(md)
              })
              .updated((_, doc) => {
                const state = doc.toJSON()
                debounce(onProseStateChange, 300)(state)
              })
              .focus(() => onMilkdownFocus())
              .blur(() => onMilkdownBlur())
          }
        })
    },
    [defaultValue, onChange],
  )

  return editorInfo
}
