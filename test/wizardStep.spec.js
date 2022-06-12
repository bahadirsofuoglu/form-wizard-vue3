import { mount } from '@vue/test-utils'
import { expect, test, beforeEach, describe, vi } from 'vitest'
import WizardStep from '../src/components/WizardStep.vue'

let wrapper
const mountWizardStep = props => {
  wrapper = mount(WizardStep, {
    props: { ...props }
  })
}

beforeEach(() => {
  mountWizardStep({ tab: { icon: 'map' } })
})

describe('Wizard unit tests', () => {
  test('displayPrevTab should be false when component mount', () => {
    expect(wrapper.find('.fw-step-container > i').classes()[0]).toBe('bi')
  })

  test('displayPrevTab should be false when component mount', async () => {
    mountWizardStep({ tab: {} })

    expect(wrapper.find('.fw-step-container > i').text()).toBe('1')
  })
})
