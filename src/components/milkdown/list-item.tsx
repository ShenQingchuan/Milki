import { useNodeViewContext } from '@prosemirror-adapter/react'
import clsx from 'clsx'
import type { FC } from 'react'
import { useEventCallback } from '../../hooks'

export const ListItem: FC = () => {
  const { contentRef, node, setAttrs, selected } = useNodeViewContext()
  const { attrs } = node
  const checked = attrs?.checked
  const isBullet = attrs?.listType === 'bullet'

  const handleToggleCheck = useEventCallback(() => {
    setAttrs({ checked: !checked })
  }, [])

  return (
    <li
      className={clsx(
        'flex items-start gap-2',
        selected ? 'ProseMirror-selectednode' : '',
      )}
    >
      <span className='flex h-6 items-center'>
        {
          checked != null
            ? (
                <input
                  type="checkbox"
                  checked={checked}
                  className="checkbox checkbox-primary"
                  onChange={handleToggleCheck}
                />
              )
            : isBullet
              ? (<span className='h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-200 ' />)
              : (<span className='text-slate-400'>{attrs?.label}</span>)
        }
      </span>
      <div className='min-w-[1px]' ref={contentRef} />
    </li>
  )
}
