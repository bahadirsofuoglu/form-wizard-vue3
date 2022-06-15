import { mount } from '@vue/test-utils'
import { expect, test, beforeEach, describe, vi } from 'vitest'
import Wizard from '../src/components/Wizard.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(Wizard)
})

const getActiveItemCount = () => {
  return wrapper.vm.tabs.filter(tab => tab.active).length
}
const getCheckedItemCount = () => {
  return wrapper.vm.tabs.filter(tab => tab.checked).length
}

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

  test('when navigableTabs props is false currentTabIndex should not change', async () => {
    await wrapper.findAll('.fw-body-list > li')[1].trigger('click')

    expect(wrapper.vm.currentTabIndex).toEqual(0)
  })

  test('when navigableTabs props is true currentTabIndex should change', async () => {
    await wrapper.setProps({ navigableTabs: true })
    await wrapper.findAll('.fw-body-list > li')[1].trigger('click')

    expect(wrapper.vm.currentTabIndex).toEqual(1)
    expect(getActiveItemCount()).toEqual(1)
    expect(getCheckedItemCount()).toEqual(1)
  })

  test('when navigableTabs props true and tabs cliced buttons text should be changed', async () => {
    await wrapper.setProps({ navigableTabs: true })
    await wrapper.findAll('.fw-body-list > li')[2].trigger('click')

    expect(wrapper.findAll('.fw-btn')[0].text()).toBe('Back')
    expect(wrapper.findAll('.fw-btn')[1].text()).toBe('Done')
  })

  test('when trigger next button nextTab function should be triggered', async () => {
    await wrapper.findAll('.fw-btn')[0].trigger('click')

    expect(wrapper.vm.currentTabIndex).toEqual(1)
    expect(getActiveItemCount()).toEqual(1)
    expect(getCheckedItemCount()).toEqual(1)
    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('when trigger back button prevTab function should be triggered', async () => {
    await wrapper.findAll('.fw-btn')[0].trigger('click')
    await wrapper.findAll('.fw-btn')[0].trigger('click')

    expect(wrapper.vm.currentTabIndex).toEqual(0)
    expect(getActiveItemCount()).toEqual(1)
    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('when click done button completedWizard should be emited', async () => {
    await wrapper.setProps({ navigableTabs: true })
    await wrapper.findAll('.fw-body-list > li')[2].trigger('click')
    await wrapper.findAll('.fw-btn')[1].trigger('click')

    expect(wrapper.findAll('.fw-btn')[1].text()).toBe('Done')
    expect(wrapper.vm.currentTabIndex).toEqual(2)
    expect(getActiveItemCount()).toEqual(1)
    expect(getCheckedItemCount()).toEqual(2)
    expect(wrapper.emitted().completeWizard).toBeTruthy()
  })
})
