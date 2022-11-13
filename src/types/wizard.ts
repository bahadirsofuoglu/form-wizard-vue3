export interface Tab {
  id?: number
  title?: string
  icon?: string
  active?: boolean
  checked?: boolean
}

export interface ButtonOption {
  text: string
  icon: string
  hideText: boolean
  hideIcon: boolean
  disabled: boolean
}

export interface Props {
  id: string
  customTabs: any[]
  nextButton: Partial<ButtonOption>
  backButton: Partial<ButtonOption>
  doneButton: Partial<ButtonOption>
  hideButtons: boolean
  startIndex: number
  verticalTabs: boolean
  scrollableTabs: boolean
  cardBackground: boolean
  navigableTabs: boolean
  beforeChange: Function
  beforeMount: Function
  squaredTabs: boolean
}
