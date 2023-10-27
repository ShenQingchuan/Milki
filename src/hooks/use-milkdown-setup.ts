import toast from 'react-hot-toast'
import { useRequest } from 'ahooks'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { IDisposable, editor } from 'monaco-editor'
import type { Response } from 'redaxios'
import {
  flickerMilkiUpdateSuccess,
  milkiDocData,
  milkiDocId,
  milkiMarkdown,
  milkiStateJSON,
  milkiTitle,
  milkiUpdateLoading,
} from '../atoms/milkdown'
import { cutStrLen } from '../utils'
import { $http } from '../utils/fetcher'
import type { MilkiResponse } from '../../shared/types'
import type { MilkdownRef } from '../utils/types'
import type { GetDocDataByIdResponse, UpsertDocResponse } from '../../shared/types/eden'
import { useQuery } from './use-query'
import { useEventCallback } from './use-event-callback'
import { useTranslator } from './use-translator'

export function useMilkdownSetup() {
  const t = useTranslator()
  const navigate = useNavigate()
  const routeQuery = useQuery()

  const [isFirstLoadDone, setFirstLoadDone] = useState(false)

  const lockMilkdown = useRef(false)
  const lockMonaco = useRef(false)
  const milkdownRef = useRef<MilkdownRef>(null)
  const monacoRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoDisposables = useRef<IDisposable[]>([])

  const [markdownContent, setMarkdownContent] = useAtom(milkiMarkdown)
  const docData = useAtomValue(milkiDocData)
  const setDocId = useSetAtom(milkiDocId)
  const setTitle = useSetAtom(milkiTitle)
  const setStateJson = useSetAtom(milkiStateJSON)
  const setUpdateLoading = useSetAtom(milkiUpdateLoading)

  // Initially fetch document content
  const { loading: isInitFetchDocLoading } = useRequest(
    async () => {
      if (!routeQuery.id) {
        return
      }

      try {
        const initFetchResp = await $http.get<MilkiResponse<GetDocDataByIdResponse>>(
          `/api/v1/docs/data-by-id?id=${routeQuery.id}`,
        )
        const { doc } = initFetchResp.data.data
        const { title, id, markdown } = doc
        setTitle(title)
        setDocId(id)
        setMarkdownContent(markdown)
      }
      catch (err) {
        toast.error(
          t('milkdown.init-fetch-error-toast', {
            errDetail: cutStrLen(
              (err as Response<MilkiResponse>).data.errDetail ?? '',
              10,
            ),
          }),
          { id: 'milki-doc-init-fetch-toast' },
        )
      }
    },
    { cacheKey: 'milkdown-doc-init-fetch' },
  )

  // Upsert request
  const { loading: isUpdateLoading, run: sendUpdateDocRequest } = useRequest(
    async () => {
      try {
        const markdown = monacoRef.current?.getValue() ?? ''
        const upsertResp = await $http.post<MilkiResponse<UpsertDocResponse>>(
          '/api/v1/docs/upsert',
          {
            ...docData,
            markdown,
          },
        )
        const { data: upsertRespData } = upsertResp
        if (upsertRespData.data.type === 'create') {
          setDocId(upsertRespData.data.id)
          return navigate(`/edit?id=${upsertRespData.data.id}`)
        }

        if (!isFirstLoadDone) {
          setFirstLoadDone(true)
        }
        else {
          flickerMilkiUpdateSuccess()
        }
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

  const handleMonacoDidMount = useEventCallback((
    editor: editor.IStandaloneCodeEditor,
  ) => {
    monacoRef.current = editor
    const focusDispose = monacoRef.current.onDidFocusEditorText(() => {
      lockMonaco.current = true
    })
    const blurDispose = monacoRef.current.onDidBlurEditorText(() => {
      lockMonaco.current = false
    })
    monacoDisposables.current.push(focusDispose, blurDispose)
  }, [markdownContent])

  const onProseStateChange = useCallback((state: any) => {
    setStateJson(JSON.stringify(state))
  }, [setStateJson])

  const onMonacoChange = useCallback((newMarkdown: string | undefined) => {
    if (lockMilkdown.current || !milkdownRef.current || newMarkdown == null) {
      return
    }
    milkdownRef.current.update(newMarkdown)
    sendUpdateDocRequest()
  }, [sendUpdateDocRequest])

  const onMilkdownChange = useCallback((newMarkdown: string | undefined) => {
    if (lockMonaco.current || !monacoRef.current || newMarkdown == null) {
      return
    }
    monacoRef.current.setValue(newMarkdown)
    sendUpdateDocRequest()
  }, [sendUpdateDocRequest])

  const onMilkdownFocus = useCallback(() => {
    lockMilkdown.current = true
  }, [])

  const onMilkdownBlur = useCallback(() => {
    lockMilkdown.current = false
  }, [])

  useEffect(() => {
    if (routeQuery.id) {
      setDocId(routeQuery.id)
    }

    return () => {
      monacoDisposables.current.forEach(d => d.dispose())
      monacoDisposables.current = []
    }
  }, [routeQuery.id, setDocId])

  useEffect(() => {
    setUpdateLoading(isUpdateLoading)
  }, [isUpdateLoading, setUpdateLoading])

  return {
    milkdownRef,
    monacoRef,
    markdownContent,
    isInitFetchDocLoading,
    handleMonacoDidMount,
    onProseStateChange,
    onMonacoChange,
    onMilkdownChange,
    onMilkdownFocus,
    onMilkdownBlur,
  }
}
