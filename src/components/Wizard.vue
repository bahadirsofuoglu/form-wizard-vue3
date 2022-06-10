<template>
  <div
    :id="id"
    class="form-wizard-vue"
    :class="[{ 'fw-vertical': isVertical }]"
  >
    <ul class="fw-body-list" role="tablist">
      <WizardStep
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :tab="tab"
        :index="index"
        :currentIndex="currentTabIndex"
        @click="navigateToTab(index)"
      >
      </WizardStep>
    </ul>
    <div class="fw-body">
      <div class="fw-body-content">
        <div class="fw-body-container">
          <slot />
        </div>
      </div>
      <div v-if="!hideButtons" class="fw-footer">
        <slot name="footer">
          <div class="fw-footer-left">
            <span v-if="displayPrevTab" role="button" @click="prevTab">
              <slot name="prev">
                <button class="fw-btn fw-btn-back">
                  {{ backButtonText }}
                </button>
              </slot>
            </span>
            <slot name="custom-buttons-left" />
          </div>

          <div class="fw-footer-right">
            <slot name="custom-buttons-right" />

            <span v-if="isLastStep" role="button" @click="nextTab">
              <slot name="finish">
                <button class="fw-btn">
                  {{ finishButtonText }}
                </button>
              </slot>
            </span>

            <span v-else role="button" @click="nextTab">
              <slot name="next">
                <button class="fw-btn">
                  {{ nextButtonText }}
                </button>
              </slot>
            </span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import WizardStep from './WizardStep.vue'

type Tab = {
  id?: number
  title?: string
  active?: boolean
  icon?: string
}

const emit = defineEmits(['change', 'completeWizard'])

const props = defineProps({
  customTabs: {
    type: Array,
    default: () => [
      {
        id: 0,
        active: true,
        title: 'Step 1',
        icon: 'map'
      },
      {
        id: 1,
        title: 'Step 2',
        icon: 'check'
      }
    ]
  },
  id: {
    type: String,
    default: 'fw-' + new Date().valueOf()
  },
  nextButtonText: {
    type: String,
    default: 'Next'
  },
  backButtonText: {
    type: String,
    default: 'Back'
  },
  finishButtonText: {
    type: String,
    default: 'Finish'
  },
  hideButtons: {
    type: Boolean,
    default: false
  },
  startIndex: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0
    }
  },
  isVertical: {
    type: Boolean,
    default: false
  },
  beforeChange: {
    type: Function,
    default: () => {}
  },
  navigableTabs: {
    type: Boolean,
    default: false
  }
})

let maxTabIndex: number = $ref()
let currentTabIndex = $ref(0)
let tabs: Tab[] = $ref([])

onMounted(() => {
  setDefaultValues()
})

const displayPrevTab = computed(() => {
  return currentTabIndex !== 0
})

const isLastStep = computed(() => {
  return currentTabIndex === maxTabIndex
})

const setDefaultValues = () => {
  tabs = props.customTabs as Tab[]

  maxTabIndex = tabs.length - 1
  currentTabIndex = props.startIndex

  setActiveIndex()
  emit('change', currentTabIndex)
}

const nextTab = () => {
  if (currentTabIndex === maxTabIndex) {
    completeWizard()

    return
  }

  currentTabIndex = currentTabIndex + 1

  setActiveIndex()
  props.beforeChange()

  emit('change', currentTabIndex)
}

const prevTab = () => {
  if (currentTabIndex === 0) {
    return
  }

  currentTabIndex = currentTabIndex - 1

  setActiveIndex()

  props.beforeChange()

  emit('change', currentTabIndex)
}

const setActiveIndex = () => {
  for (const [index, tab] of tabs.entries()) {
    if (index === maxTabIndex + 1) {
      return
    }
    tab.active = index <= currentTabIndex
  }
}

const completeWizard = () => {
  emit('completeWizard', currentTabIndex)
}

const navigateToTab = (index: number) => {
  if (!props.navigableTabs) return

  currentTabIndex = index

  setActiveIndex()
}
</script>
