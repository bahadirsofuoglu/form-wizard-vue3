<template>
  <div
    :id="id ? id : ''"
    class="fw-container"
    :class="[stepSize, { vertical: isVertical, 'wizard-vertical': isVertical }]"
  >
    <div v-if="$slots['title']" class="wizard-header">
      <slot name="title">
        <h4 class="fw-title">
          {{ title }}
        </h4>
        <p class="fw-subtitle">
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <div class="fw-navigation">
      <div v-if="!isVertical" class="fw-progress-with-circle">
        <div class="wizard-progress-bar" />
      </div>
      <ul class="fw-nav fw-nav-pills" role="tablist" :class="stepsClasses">
        <wizard-step
          v-for="(tab, index) in tabs.value"
          :key="tab.id"
          :tab="tab"
          :step-size="stepSize"
          :index="index"
          @click="navigateToTab(index)"
        >
        </wizard-step>
      </ul>
      <div class="fw-tab-content">
        <div class="fw-tab-container">
          <slot />
        </div>
      </div>
    </div>

    <div v-if="!hideButtons" class="fw-card-footer">
      <slot name="footer">
        <div class="fw-footer-left">
          <span v-if="displayPrevTab" role="button" @click="prevTab">
            <slot name="prev">
              <button
                class="fw-btn"
                :style="fillButtonStyle"
                :disabled="loading"
              >
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
              <button class="fw-btn" :style="fillButtonStyle">
                {{ finishButtonText }}
              </button>
            </slot>
          </span>

          <span v-else role="button" @click="nextTab">
            <slot name="next">
              <button
                class="fw-btn"
                :style="fillButtonStyle"
                :disabled="loading"
              >
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
        icon: 'fa fa-pencil',
        active: true
      },
      {
        id: 1,
        icon: 'fa fa-map'
      },
      {
        id: 2,
        icon: 'fa fa-map'
      }
    ]
  },
  id: {
    type: String,
    default: 'f-w-' + new Date().valueOf()
  },
  title: {
    type: String,
    default: 'Awesome Wizard'
  },
  subtitle: {
    type: String,
    default: 'Split a complicated flow in multiple steps'
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
  stepsClasses: {
    type: [String, Array],
    default: ''
  },
  stepSize: {
    type: String,
    default: 'md',
    validator: value => {
      let acceptedValues = ['xs', 'sm', 'md', 'lg']

      return acceptedValues.indexOf(value) !== -1
    }
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
const currentTabIndex = ref()
const tabs = ref([])

onMounted(() => {
  setDefaultValues()
})

const displayPrevTab = computed(() => {
  return currentTabIndex.value !== 0
})
const fillButtonStyle = computed(() => {
  return {
    backgroundColor: props.color,
    borderColor: props.color,
    color: 'white'
  }
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

  emit('change', currentTabIndex.value)
}

const prevTab = () => {
  if (currentTabIndex.value === 0) {
    return
  }

  currentTabIndex.value = currentTabIndex.value - 1

  setActiveIndex()
  props.beforeChange()

  emit('change', currentTabIndex.value)
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
  emit('completeWizard', currentTabIndex.value)
}
const navigateToTab = index => {
  if (!navigableTabs) return

  currentTabIndex = index

  setActiveIndex()
}
</script>
