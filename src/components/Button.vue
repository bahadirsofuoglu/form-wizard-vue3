<template>
    <button :class="getButtonClass" :disabled="options.disabled">
        <span v-if="!options.hideText">{{ options.text }}</span>
        <i v-if="!options.hideIcon" :class="getIconClass(options.icon)" />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
    options: {
        type: Object,
        default: function () {
            return {}
        }
    }
})

const getIconClass = (iconName: string) => `pi pi-${iconName}`

const getButtonClass = computed(() => {
    return [
        'fw-btn',
        {
            'fw-btn-disabled': props.options.disabled
        }
    ]
})
</script>
