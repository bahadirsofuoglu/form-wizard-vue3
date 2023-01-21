<script setup>
  import CodeBlock from '../components/CodeBlock.vue'
  import FormWizard from '../../src/components/Wizard.vue'
  import '../../src/scss/form-wizard-vue3.scss'
</script>

## Change Tabs

Steps can customize.
<CodeBlock>
<template #code>

```js
<template>
    <FormWizard :customTabs ="[
            {
                id: 0,
                title: 'Step 1',
            },
            {
                id: 1,
                title: 'Step 2',
            },
            {
                id: 2,
                title: 'Step 3',
            }
        ]" />
</template>
```

</template>
<FormWizard :customTabs ="[
            {
                id: 0,
                title: 'Step 1',
            },
            {
                id: 1,
                title: 'Step 2',
            },
            {
                id: 2,
                title: 'Step 3',
            }
        ]" />
</CodeBlock>

## Button Options

All buttons can customize.
<CodeBlock>
<template #code>

```js
<template>
    <FormWizard  :nextButton="{
          text: 'test',
          hideIcon:true
        }"
        :backButton="{
          text: 'test',
          hideIcon:true,
          disabled:true
        }"
        :doneButton="{
          text: 'test',
          icon: 'file',
          disabled:true
        }"
        />
</template>
```

</template>
<FormWizard  :nextButton="{
          text: 'test',
          hideIcon:true
        }" 
        :backButton="{
          text: 'test',
          hideIcon:true,
          disabled:true
        }"
        :doneButton="{
          text: 'test',
          icon: 'file',
          disabled:true
        }"
        />
</CodeBlock>

## Vertical Tabs without progress

Changable tab position
<CodeBlock>
<template #code>

```js
<template>
    <FormWizard :show-progress="false"  vertical-tabs />
</template>
```

</template>
<FormWizard  vertical-tabs :show-progress="false"/>
</CodeBlock>

## Squared Tabs with card background

Changable tab position
<CodeBlock>
<template #code>

```js
<template>
    <FormWizard squared-tabs card-background />
</template>
```

</template>
<FormWizard  squared-tabs card-background/>
</CodeBlock>
