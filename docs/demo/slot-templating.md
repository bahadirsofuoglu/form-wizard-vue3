<script setup>
  import CodeBlock from '../components/CodeBlock.vue'
  import FormWizard from '../../src/components/Wizard.vue'
  import '../../src/scss/form-wizard-vue3.scss'
</script>

## Slots Templating Sample

All parts have slots for templating. You can check slots api section for all slots
<CodeBlock>
<template #code>

```js
<template>
    <FormWizard navigableTabs>
    <h1>Hello</h1>
    <template #wizard-step="{tab,index,navigateToTab}">
        <div style="display:flex;flex-direction:column; align-items:center;padding:2rem">
          <button @click="navigateToTab(index)">{{tab.title}} - click me</button>
          <span>{{index}}</span>
        </div>
      </template>
    <template #back>
       <button :style="{background: 'red', borderRadius: '6px',padding:'0.5rem'}">
       Test Back Button
       </button>
    </template>
    <template #next>
       <button :style="{background: 'blue', borderRadius: '6px',padding:'0.5rem'}">
       Test Next Button
       </button>
    </template>
    <template #done>
       <button :style="{background: 'pink', borderRadius: '6px',padding:'0.5rem'}">
       Test Done Button
       </button>
    </template>
 </FormWizard>
</template>
```

</template>
<FormWizard navigableTabs>
<h1>hello</h1>
<template #wizard-step="{tab,index,navigateToTab}">
        <div style="display:flex;flex-direction:column; align-items:center;padding:2rem">
          <button @click="navigateToTab(index)">{{tab.title}} - click me</button>
          <span>{{index}}</span>
        </div>
      </template>
    <template #back>
       <button :style="{background: 'red', borderRadius: '6px',padding:'0.5rem'}">
       Test Back Button
       </button>
    </template>
    <template #next>
       <button :style="{background: 'blue', borderRadius: '6px',padding:'0.5rem'}">
       Test Next Button
       </button>
    </template>
    <template #done>
       <button :style="{background: 'pink', borderRadius: '6px',padding:'0.5rem'}">
       Test Done Button
       </button>
    </template>
 </FormWizard>
</CodeBlock>
