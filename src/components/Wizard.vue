<template>
    <div :id="id" :class="containerClasses">
        <ul class="fw-body-list" role="tablist">
            <template v-for="(tab, index) in tabs">
                <slot
                    name="wizard-step"
                    :tab="tab"
                    :index="index"
                    :navigateToTab="navigateToTab"
                >
                    <wizard-step
                        :key="tab.id"
                        :tab="tab"
                        :index="index"
                        :currentIndex="currentTabIndex"
                        :squaredTab="squaredTabs"
                        :showProgress="showProgress"
                        @click="navigateToTab(index)"
                    >
                        <template #active-step>
                            <slot name="active-step"></slot>
                        </template>

                        <template #title>
                            <slot name="title"></slot>
                        </template>
                    </wizard-step>
                </slot>
            </template>
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
                        <span
                            v-if="displayPrevTab"
                            role="button"
                            @click="prevTab"
                        >
                            <slot name="back">
                                <Button :options="backButtonOptions" />
                            </slot>
                        </span>
                        <slot name="custom-buttons-left" />
                    </div>

                    <div class="fw-footer-right">
                        <slot name="custom-buttons-right" />

                        <span v-if="isLastStep" role="button" @click="nextTab">
                            <slot name="done">
                                <Button :options="doneButtonOptions" />
                            </slot>
                        </span>

                        <div v-else role="button" @click="nextTab">
                            <slot name="next">
                                <Button :options="nextButtonOptions" />
                            </slot>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, nextTick, ref } from 'vue'
import WizardStep from './WizardStep.vue'
import Button from './Button.vue'
import type { Tab, Props } from '../types/wizard'

const emit = defineEmits(['change', 'complete:wizard', 'updated:tabs'])

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
                icon: 'pencil'
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
    beforeMount: {
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
    },
    squaredTabs: {
        type: Boolean,
        default: false
    },
    showProgress: {
        type: Boolean,
        default: true
    }
})

let maxTabIndex = ref<number>()
let currentTabIndex = ref<number>(0)
let tabs = ref<Tab[]>([])

const backButtonOptions = computed(() => {
    return Object.assign(
        {
            text: 'Back',
            icon: 'arrow-left',
            hideText: false,
            hideIcon: false,
            disabled: false
        },
        props.backButton
    )
})

const nextButtonOptions = computed(() => {
    return Object.assign(
        {
            text: 'Next',
            icon: 'arrow-right',
            hideText: false,
            hideIcon: false,
            disabled: false
        },
        props.nextButton
    )
})

const doneButtonOptions = computed(() => {
    return Object.assign(
        {
            text: 'Done',
            icon: 'check',
            hideText: false,
            hideIcon: false,
            disabled: false
        },
        props.doneButton
    )
})

onMounted(() => {
    setDefaultValues()
})

const displayPrevTab = computed(() => {
    return currentTabIndex.value !== 0
})

const isLastStep = computed(() => {
    return currentTabIndex.value === maxTabIndex.value
})

const containerClasses = computed(() => {
    return [
        'form-wizard-vue',
        { 'fw-vertical': props.verticalTabs },
        { 'fw-overflow-scroll': props.scrollableTabs },
        { 'fw-card': props.cardBackground }
    ]
})
const setDefaultValues = () => {
    tabs.value = props.customTabs as Tab[]

    maxTabIndex.value = tabs.value.length - 1
    currentTabIndex.value = props.startIndex

    setActiveIndex()

    emit('change', currentTabIndex)
}

const nextTab = async () => {
    if (currentTabIndex.value === maxTabIndex.value) {
        if (!doneButtonOptions.value.disabled) completeWizard()

        return
    }

    if (nextButtonOptions.value.disabled) return

    const newTabIndex = currentTabIndex.value + 1
    const oldTabIndex = currentTabIndex.value

    emit('change', newTabIndex, oldTabIndex)

    await props.beforeChange()

    changeTab(newTabIndex)
}

const prevTab = async () => {
    if (currentTabIndex.value === 0 || backButtonOptions.value.disabled) return

    const newTabIndex = currentTabIndex.value - 1
    const oldTabIndex = currentTabIndex.value

    emit('change', newTabIndex, oldTabIndex)

    await props.beforeChange()

    changeTab(newTabIndex)
}

const setActiveIndex = () => {
    const currentTabs: any = tabs.value.entries()

    for (const [index, tab] of currentTabs) {
        if (index === maxTabIndex.value + 1) {
            return
        }

        tab.checked = index < currentTabIndex.value
        tab.active = index === currentTabIndex.value
    }

    emit('updated:tabs', tabs, currentTabIndex)
}

const completeWizard = () => {
    const newTabIndex = currentTabIndex.value
    const oldTabIndex = currentTabIndex.value - 1

    emit('complete:wizard', newTabIndex, oldTabIndex)
}

const navigateToTab = async (index: number) => {
    if (!props.navigableTabs) return

    const newTabIndex = index
    const oldTabIndex = currentTabIndex.value

    emit('change', newTabIndex, oldTabIndex)

    await props.beforeChange()

    changeTab(newTabIndex)
}

const changeTab = async (newTabIndex: number) => {
    currentTabIndex.value = newTabIndex

    setActiveIndex()

    await nextTick()
    await props.beforeMount()
}

defineExpose({
    changeTab
})
</script>
