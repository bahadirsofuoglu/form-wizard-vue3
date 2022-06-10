import { mount } from '@vue/test-utils'
import { nextTick } from 'process'
import { expect, test, beforeEach, describe, vi } from 'vitest'
import Wizard from '../src/components/Wizard.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(Wizard)
})

describe('Wizard unit tests', () => {
  test('displayPrevTab should be false when component mount', () => {
    expect(wrapper.vm.displayPrevTab).toBe(false)
  })

  test('isLastStep should be false when component mount', () => {
    expect(wrapper.vm.isLastStep).toBe(false)
  })

  test('setDefaulValues method testing', async () => {
    await wrapper.vm.setDefaultValues()

    expect(wrapper.vm.tabs).toEqual(wrapper.vm.customTabs)
    expect(wrapper.vm.maxTabIndex).toEqual(wrapper.vm.tabs.length - 1)
    expect(wrapper.vm.currentTabIndex).toEqual(wrapper.vm.startIndex)
  })
})
