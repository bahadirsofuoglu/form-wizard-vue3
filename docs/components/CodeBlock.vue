<template>
    <div class="code-block-container">
        <div class="code-block-header">
            <button class="code-block-btn" @click="code = !code">
                {{ code ? 'Demo' : 'Code' }}
            </button>
        </div>
        <div class="code-block-body">
            <component :is="code ? slots.code : slots.default" />
        </div>
    </div>
</template>

<script setup>
import { ref, useSlots } from 'vue'

const code = ref(false)
const slots = useSlots()
</script>

<style scoped>
.code-block-container {
    display: flex;
    flex-direction: column;
}

.code-block-header {
    display: flex;
    justify-content: flex-end;

    padding: 0.5rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.code-block-body {
    padding: 1rem;
}

.code-block-body > * {
    margin: 0;
}

.code-block-btn {
    background-color: #eff0f7;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    color: #161618;
}
</style>
