import { atom, createStore } from 'jotai'

export const milkdownStore = createStore()

export const milkiDocId = atom('')
export const milkiTitle = atom('')
export const milkiStateJSON = atom('')
export const milkiMarkdown = atom('')

export const milkiUpdateLoading = atom(false)

export const milkiShowUpdateSuccess = atom(false)
export function flickerMilkiUpdateSuccess() {
  milkdownStore.set(milkiShowUpdateSuccess, true)
  setTimeout(() => {
    milkdownStore.set(milkiShowUpdateSuccess, false)
  }, 2000)
}

export const milkiDocData = atom((get) => {
  const id = get(milkiDocId) || undefined

  return {
    id,
    title: get(milkiTitle),
    json: get(milkiStateJSON),
  }
})
