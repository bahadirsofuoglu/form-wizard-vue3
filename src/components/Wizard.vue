<template>
  <div
    :id="id"
    class="form-wizard-vue"
    :class="[
      { 'fw-vertical': verticalTabs },
      { 'fw-overflow-scroll': scrollableTabs },
      { 'fw-card': cardBackground }
    ]"
  >
    <ul class="fw-body-list" role="tablist">
      <wizard-step
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :tab="tab"
        :index="index"
        :currentIndex="currentTabIndex"
        @click="navigateToTab(index)"
      >
      </wizard-step>
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
              <slot name="back">
                <button class="fw-btn fw-btn-back">
                  <i :class="getIconClass(backButtonOptions.icon)" />
                  <span v-if="!backButtonOptions.hideText">{{
                    backButtonOptions.text
                  }}</span>
                </button>
              </slot>
            </span>
            <slot name="custom-buttons-left" />
          </div>

          <div class="fw-footer-right">
            <slot name="custom-buttons-right" />

            <span v-if="isLastStep" role="button" @click="nextTab">
              <slot name="done">
                <button class="fw-btn">
                  <span v-if="!doneButtonOptions.hideText">{{
                    doneButtonOptions.text
                  }}</span>
                  <i :class="getIconClass(doneButtonOptions.icon)" />
                </button>
              </slot>
            </span>

            <span v-else role="button" @click="nextTab">
              <slot name="next">
                <button class="fw-btn">
                  <span v-if="!nextButtonOptions.hideText">{{
                    nextButtonOptions.text
                  }}</span>
                  <i :class="getIconClass(nextButtonOptions.icon)" />
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
import { ButtonOption, Tab, Props } from '../types/wizard'

const emit = defineEmits(['change', 'completeWizard'])

const props: Props = defineProps({
  id: {
    type: String,
    default: 'fw-' + new Date().valueOf()
  },
  customTabs: {
    type: Array,
    default: () => [
      {
        id: 0,
        title: 'Step 1',
        icon: 'map'
      },
      {
        id: 1,
        title: 'Step 2',
        icon: 'check'
      },
      {
        id: 2,
        title: 'Step 3',
        icon: 'pen'
      }
    ]
  },
  nextButton: {
    type: Object,
    default: function () {
      return {}
    }
  },
  backButton: {
    type: Object,
    default: function () {
      return {}
    }
  },
  doneButton: {
    type: Object,
    default: function () {
      return {}
    }
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
  verticalTabs: {
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
  },
  scrollableTabs: {
    type: Boolean,
    default: false
  },
  cardBackground: {
    type: Boolean,
    default: false
  }
})

let maxTabIndex: number = $ref()
let currentTabIndex = $ref(0)
let tabs: Tab[] = $ref([])

const backButtonOptions: ButtonOption = Object.assign(
  {
    text: 'Back',
    icon: 'arrow-left',
    hideText: false,
    hideIcon: false
  },
  props.backButton
)
const nextButtonOptions: ButtonOption = Object.assign(
  {
    text: 'Next',
    icon: 'arrow-right',
    hideText: false,
    hideIcon: false
  },
  props.nextButton
)
const doneButtonOptions: ButtonOption = Object.assign(
  {
    text: 'Done',
    icon: 'arrow-right',
    hideText: false,
    hideIcon: false
  },
  props.doneButton
)

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

  props.beforeChange()

  emit('change', currentTabIndex)
}

const getIconClass = (iconName: string) => `bi bi-${iconName}`
</script>
