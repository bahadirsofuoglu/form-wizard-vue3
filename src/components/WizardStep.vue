<template>
  <li>
    <div
      class="fw_list_progress"
      :class="{ 'fw_list_progress-active': progressActive }"
    ></div>
    <div class="fw_list_wrapper">
      <div
        :id="`step-${tab.id}`"
        class="fw-icon-circle"
        role="tab"
        :class="[
          {
            'fw-step-active': tab.active
          }
        ]"
      >
        <div class="fw-step-container">
          <slot name="active-step">
            <i v-if="props.tab.icon" :icon="props.tab.icon" class="fw-icon"></i>
            <i v-else class="fw-icon">{{ index + 1 }}</i>
          </slot>
        </div>
      </div>
      <slot name="title">
        <span
          class="stepTitle"
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
<script setup>
import { onMounted, computed } from 'vue'
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
    type: Number
  }
})

const progressActive = computed(() => {
  return props.currentIndex > props.index
})

onMounted(() => {
  console.log(props.currentIndex === props.index + 1)
})
</script>
