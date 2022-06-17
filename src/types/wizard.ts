export interface Tab {
  id?: number
  title?: string
  icon?: string
  active?: boolean
}

export interface ButtonOption {
  text: string
  icon: string
  hideText: boolean
  hideIcon: boolean
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
  squaredTabs: boolean
}
