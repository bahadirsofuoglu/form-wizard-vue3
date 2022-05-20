<template>
  <li>
    <a>
      <div
        :id="`step-${tab.valuetabId}`"
        class="fw-icon-circle md"
        role="tab"
        :tabindex="tab.valuechecked ? 0 : ''"
        :aria-controls="tab.valuetabId"
        :aria-disabled="tab.valueactive"
        :aria-selected="tab.valueactive"
        :class="{
          checked: tab.valuechecked,
          square_shape: isStepSquare,
          tab_shape: isTabShape
        }"
        :style="[
          tab.valuechecked ? stepCheckedStyle : {},
          tab.valuevalidationError ? errorStyle : {}
        ]"
      >
        <div
          v-if="tab.valueactive"
          class="fw-icon-container"
          :class="{ square_shape: isStepSquare, tab_shape: isTabShape }"
          :style="[
            tab.valueactive ? iconActiveStyle : {},
            tab.valuevalidationError ? errorStyle : {}
          ]"
        >
          <slot name="active-step">
            <i v-if="tab.valueicon" :icon="tab.valueicon" class="fw-icon"></i>
            <i v-else class="fw-icon">{{ index + 1 }}</i>
          </slot>
        </div>
        <slot v-if="!tab.valueactive">
          <i
            v-if="!tab.valueactive && tab.valueicon"
            :icon="tab.valueicon"
            class="fw-icon"
          ></i>
          <i v-if="!tab.valueactive && !tab.valueicon" class="fw-icon">{{
            index + 1
          }}</i>
        </slot>
      </div>
      <slot name="title">
        <span
          class="stepTitle"
          :class="{
            active: tab.valueactive,
            has_error: tab.valuevalidationError
          }"
          :style="tab.valueactive ? stepTitleStyle : {}"
        >
          {{ tab.valuetitle }}
        </span>
      </slot>
    </a>
  </li>
</template>
<script setup>
import { onMounted, computed } from 'vue'
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
  console.log('hello')
})
const iconActiveStyle = computed(() => {
  return {
    backgroundColor: tab.valuecolor ?? '#2c3e50'
  }
})

const stepCheckedStyle = computed(() => {
  return {
    borderColor: tab.valuecolor ?? '#2c3e50'
  }
})
const errorStyle = computed(() => {
  return {
    borderColor: tab.valueerrorColor,
    backgroundColor: tab.valueerrorColor
  }
})
const stepTitleStyle = computed(() => {
  let isError = tab.valuevalidationError

  return {
    color: isError ? tab.valueerrorColor : tab.valuecolor
  }
})
</script>
