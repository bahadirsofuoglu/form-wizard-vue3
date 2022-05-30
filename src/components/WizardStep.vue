<template>
  <li>
    <a>
      <div
        :id="`step-${tab.tabId}`"
        class="fw-icon-circle md"
        role="tab"
        :tabindex="tab.checked ? 0 : ''"
        :aria-controls="tab.tabId"
        :aria-disabled="tab.active"
        :aria-selected="tab.active"
        :class="[
          {
            'fw-step-active': tab.active
          }
        ]"
      >
        <div
          class="fw-step-container"
          :style="[tab.valuevalidationError ? errorStyle : {}]"
        >
          <slot name="active-step">
            <i v-if="props.tab.icon" :icon="props.tab.icon" class="fw-icon"></i>
            <i v-else class="fw-icon">{{ index + 1 }}</i>
          </slot>
        </div>
      </div>
      <div
        class="fw-step-progress"
        :class="[
          {
            'fw-step-progress-active': tab.active
          }
        ]"
      />
      <slot name="title">
        <span
          class="stepTitle"
          :class="{
            active: tab.active,
            has_error: tab.valuevalidationError
          }"
          :style="tab.active ? stepTitleStyle : {}"
        >
          {{ tab.title }}
        </span>
      </slot>
    </a>
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
  }
})

onMounted(() => {
  console.log(props.tab.active)
})
</script>
