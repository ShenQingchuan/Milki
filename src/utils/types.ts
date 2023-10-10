export interface MilkdownRef {
  update: (markdown: string) => void
}

export interface SideBarItem {
  icon: string
  label: string
  route: string
}

export interface SignFormInputs {
  username: string
  password: string
}

export interface UseMilkdownEditorOptions {
  isEditable: boolean
  onChange?: (md: string) => void
  onProseStateChange?: (state: any) => void
  onMilkdownFocus?: () => void
  onMilkdownBlur?: () => void
}
