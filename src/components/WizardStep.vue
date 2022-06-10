<template>
  <li>
    <div
      class="fw-list-progress"
      :class="{ 'fw-list-progress-active': progressActive }"
    ></div>
    <div class="fw-list-wrapper">
      <div
        :id="`step-${tab.id}`"
        class="fw-list-wrapper-icon"
        role="tab"
        :class="[
          {
            'fw-step-active': tab.active
          }
        ]"
      >
        <div class="fw-step-container">
          <slot name="active-step">
            <i v-if="props.tab.icon" :class="iconClass"></i>
            <i v-else>{{ index + 1 }}</i>
          </slot>
        </div>
      </div>
      <slot name="title">
        <span
          class="fw-step-title"
          :class="{
            active: tab.active
          }"
        >
          {{ tab.title }}
        </span>
      </slot>
    </div>
  </li>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  tab: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number,
    default: 0
  },
  currentIndex: {
    type: Number,
    default: 0
  }
})

const progressActive = computed(() => props.currentIndex > props.index)
const iconClass = computed(() => `bi bi-${props.tab.icon}`)
</script>
