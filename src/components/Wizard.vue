<template>
  <div :id="id" class="fw" :class="[{ 'fw-vertical': isVertical }]">
    <ul class="fw__body__list" role="tablist">
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
    <div class="fw__body">
      <div class="fw__body__content">
        <div class="fw__body__container">
          <slot />
        </div>
      </div>
      <div v-if="!hideButtons" class="fw__footer">
        <slot name="footer">
          <div class="fw__footer__left">
            <span v-if="displayPrevTab" role="button" @click="prevTab">
              <slot name="prev">
                <button class="fw__btn fw__btn-back">
                  {{ backButtonText }}
                </button>
              </slot>
            </span>
            <slot name="custom-buttons-left" />
          </div>

          <div class="fw__footer__right">
            <slot name="custom-buttons-right" />

            <span v-if="isLastStep" role="button" @click="nextTab">
              <slot name="finish">
                <button class="fw__btn">
                  {{ finishButtonText }}
                </button>
              </slot>
            </span>

            <span v-else role="button" @click="nextTab">
              <slot name="next">
                <button class="fw__btn">
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

<script setup>
import { onMounted, computed } from 'vue'
import WizardStep from './WizardStep.vue'

const emit = defineEmits(['change', 'completeWizard'])

const props = defineProps({
  customTabs: {
    type: Array,
    default: () => [
      {
        id: 0,
        active: true,
        checked: false,
        title: 'Step 1'
      },
      {
        id: 1,
        checked: false,
        title: 'Step 2'
      },
      {
        id: 1,
        checked: false,
        title: 'Step 2'
      },
      {
        id: 1,
        checked: false,
        title: 'Step 2'
      },
      {
        id: 1,
        checked: false,
        title: 'Step 2'
      },
      {
        id: 1,
        checked: false,
        title: 'Step 2'
      },
      {
        id: 1,
        checked: false,
        title: 'Step 2'
      },
      {
        id: 1,
        checked: false,
        title: 'Step 2'
      },
      {
        id: 1,
        checked: false,
        title: 'Step 2'
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
    validator: value => {
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

let maxTabIndex = $ref()
let currentTabIndex = $ref(0)
let tabs = $ref([])

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
  tabs = props.customTabs.map(tab => {
    return {
      ...tab,
      active: tab.active || false
    }
  })

  maxTabIndex = tabs.length - 1
  currentTabIndex = props.startIndex
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
  tabs = tabs.map(tab => {
    return {
      ...tab,
      active: false
    }
  })

  tabs[currentTabIndex].active = true
}

const completeWizard = () => {
  emit('completeWizard', currentTabIndex)
}

const navigateToTab = index => {
  debugger
  if (!props.navigableTabs) return

  currentTabIndex = index

  setActiveIndex()
}
</script>
