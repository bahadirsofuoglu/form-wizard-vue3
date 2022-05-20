<template>
  <li :class="{ active: tab.active }">
    <a href="javascript:void(0)">
      <div
        :id="`step-${tab.tabId}`"
        class="fw-icon-circle md"
        role="tab"
        :tabindex="tab.checked ? 0 : ''"
        :aria-controls="tab.tabId"
        :aria-disabled="tab.active"
        :aria-selected="tab.active"
        :class="{
          checked: tab.checked,
          square_shape: isStepSquare,
          tab_shape: isTabShape
        }"
        :style="[
          tab.checked ? stepCheckedStyle : {},
          tab.validationError ? errorStyle : {}
        ]"
      >
        <div
          v-if="tab.active"
          class="fw-icon-container"
          :class="{ square_shape: isStepSquare, tab_shape: isTabShape }"
          :style="[
            tab.active ? iconActiveStyle : {},
            tab.validationError ? errorStyle : {}
          ]"
        >
          <slot name="active-step">
            <i v-if="tab.icon" :icon="tab.icon" class="fw-icon"></i>
            <i v-else class="fw-icon">{{ index + 1 }}</i>
          </slot>
        </div>
        <slot v-if="!tab.active">
          <i
            v-if="!tab.active && tab.icon"
            :icon="tab.icon"
            class="fw-icon"
          ></i>
          <i v-if="!tab.active && !tab.icon" class="fw-icon">{{ index + 1 }}</i>
        </slot>
      </div>
      <slot name="title">
        <span
          class="stepTitle"
          :class="{ active: tab.active, has_error: tab.validationError }"
          :style="tab.active ? stepTitleStyle : {}"
        >
          {{ tab.title }}
        </span>
      </slot>
    </a>
  </li>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
defineProps({
  tab: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number,
    default: 0
  }
})

onMounted(() => {
  console.log(tab)
})
const iconActiveStyle = computed(() => {
  return {
    backgroundColor: tab.color ?? '#2c3e50'
  }
})

const stepCheckedStyle = computed(() => {
  return {
    borderColor: tab.color ?? '#2c3e50'
  }
})
const errorStyle = computed(() => {
  return {
    borderColor: tab.errorColor,
    backgroundColor: tab.errorColor
  }
})
const stepTitleStyle = computed(() => {
  let isError = tab.validationError

  return {
    color: isError ? tab.errorColor : tab.color
  }
})
</script>
