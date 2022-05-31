<template>
  <div :id="id" class="fw">
    <div class="fw__body" :class="[{ 'fw-vertical': isVertical }]">
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
      <div class="fw__body__content">
        <div class="fw__body__container">
          <slot />
        </div>
      </div>
    </div>
    <div v-if="!hideButtons" class="fw__footer">
      <slot name="footer">
        <div class="fw__footer__left">
          <span v-if="displayPrevTab" role="button" @click="prevTab">
            <slot name="prev">
              <button class="fw__btn fw__btn-back" :disabled="loading">
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
              <button class="fw__btn" :disabled="loading">
                {{ nextButtonText }}
              </button>
            </slot>
          </span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
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
        id: 2,
        checked: false,
        title: 'Step 3'
      }
    ]
  },
  id: {
    type: String,
    default: 'fw-' + new Date().valueOf()
  },
  title: {
    type: String,
    default: 'Awesome Wizard'
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
  color: {
    type: String,
    default: '#e74c3c'
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

const loading = ref(false)
const maxTabIndex = ref()
let currentTabIndex = ref(0)
const tabs = ref([])

onMounted(() => {
  setDefaultValues()
})

const displayPrevTab = computed(() => {
  return currentTabIndex.value !== 0
})

const isLastStep = computed(() => {
  return currentTabIndex.value === maxTabIndex.value
})

const setDefaultValues = () => {
  tabs.value = props.customTabs.map(tab => {
    return {
      ...tab,
      active: tab.active || false
    }
  })
  console.log(tabs)
  maxTabIndex.value = tabs.value.length - 1
  console.log(props)
  currentTabIndex.value = props.startIndex
}
const nextTab = () => {
  if (currentTabIndex.value === maxTabIndex.value) {
    completeWizard()

    return
  }

  currentTabIndex.value = currentTabIndex.value + 1

  setActiveIndex()
  props.beforeChange()

  emit('change', currentTabIndex)
}

const prevTab = () => {
  if (currentTabIndex.value === 0) {
    return
  }

  currentTabIndex.value = currentTabIndex.value - 1

  setActiveIndex()
  props.beforeChange()

  emit('change', currentTabIndex)
}

const setActiveIndex = () => {
  tabs.value = tabs.value.map(tab => {
    return {
      ...tab,
      active: false
    }
  })

  tabs.value[currentTabIndex.value].active = true
}

const completeWizard = () => {
  emit('completeWizard', currentTabIndex)
}
const navigateToTab = index => {
  if (!navigableTabs) return

  currentTabIndex = index

  setActiveIndex()
}
</script>
