<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Wizard from './components/Wizard.vue'
import WizardStep from './components/WizardStep.vue'
import { ref } from 'vue'
const currentTab = ref(1)
const test = value => {
  currentTab.value = value
  console.log(currentTab.value)
}
</script>

<template>
  <Wizard navigable-tabs is-vertical @change="test" title="adfas">
    <div v-if="currentTab === 0">
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>

      <h1>Hello</h1>
    </div>
    <div v-if="currentTab === 1">
      <button>Hello</button>
      <button>test</button>
    </div>
  </Wizard>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
