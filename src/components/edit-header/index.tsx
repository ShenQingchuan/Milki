import { type FC, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import toast from 'react-hot-toast'
import type { Response } from 'redaxios'
import { useTranslator } from '../../hooks'
import { flickerMilkiUpdateSuccess, milkiDocData, milkiDocId, milkiShowUpdateSuccess, milkiTitle, milkiUpdateLoading } from '../../atoms/milkdown'
import { $http } from '../../utils/fetcher'
import type { MilkiResponse, UpsertDocResponse } from '../../../shared/types'
import { cutStrLen } from '../../utils'

export const EditHeader: FC = () => {
  const t = useTranslator()
  const navigate = useNavigate()

  const [docData] = useAtom(milkiDocData)
  const [showUpdateSuccess] = useAtom(milkiShowUpdateSuccess)
  const [title, setTitle] = useAtom(milkiTitle)
  const [, setDocId] = useAtom(milkiDocId)
  const [, setUpdateLoading] = useAtom(milkiUpdateLoading)

  const goBackHome = useCallback(() => {
    navigate('/')
  }, [])

  const onTitleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(e.target.value)
  }, [])

  const { loading: isUpdateLoading, run: sendUpdateTitleRequest } = useRequest(
    async () => {
      try {
        const upsertResp = await $http.post<MilkiResponse<UpsertDocResponse>>(
          '/api/v1/docs/upsert',
          { ...docData, title },
        )
        const { data: upsertRespData } = upsertResp
        if (upsertRespData.data.type === 'create') {
          setDocId(upsertRespData.data.id)
          return navigate(`/edit?id=${upsertRespData.data.id}`)
        }
        flickerMilkiUpdateSuccess()
      }
      catch (err) {
        toast.error(
          t('milkdown.update-error-toast', {
            errDetail: cutStrLen(
              (err as Response<MilkiResponse>).data.errDetail ?? '',
              10,
            ),
          }),
          { id: 'milki-update-doc-toast' },
        )
      }
    },
    { debounceWait: 600, manual: true },
  )

  const onTitleBlur = useCallback(() => {
    if (title === docData.title) {
      return
    }
    sendUpdateTitleRequest()
  }, [title, docData])

  useEffect(() => {
    setUpdateLoading(isUpdateLoading)
  }, [isUpdateLoading])

  return (
    <div className='flex items-center p-4 shadow'>
      <button className='btn btn-sm' onClick={goBackHome}>
        {t('edit-page.header.go-back')}
      </button>
      <input
        type="text"
        placeholder={t('edit-page.header.title-placeholder')}
        className="input input-sm input-ghost w-xs mx-4"
        value={title}
        onChange={onTitleChange}
        onBlur={onTitleBlur}
      />
      <div className={clsx(
        'text-xs text-secondary',
        showUpdateSuccess ? '' : 'hidden',
      )}>
        {t('edit-page.header.update-success')}
      </div>

      <div className='ml-auto flex items-center'>
        <button className='btn btn-circle btn-sm btn-ghost mx-1'>
          <i className='i-ep-collection-tag text-lg' />
        </button>
        <button className='btn btn-circle btn-sm btn-ghost mx-1'>
          <i className='i-ri-history-line text-lg' />
        </button>
        <button className='btn btn-sm ml-2'>
          {t('edit-page.header.collaboration')}
        </button>
        <div className="divider divider-horizontal mx-1 w-1" />
        <button className='btn btn-sm mr-2'>
          {t('edit-page.header.share')}
        </button>
        <button className='btn btn-circle btn-sm btn-ghost'>
          <i className='i-fluent-more-circle-24-regular text-xl' />
        </button>
      </div>
    </div>
  )
}
