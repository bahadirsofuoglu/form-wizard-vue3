# Slots

## default

Templating for body content.

```js
<template>
    <FormWizard>
        <h1>Hello</h1>
    </FormWizard>
</template>
```

## wizard-step

Templating for all header section.

```js
  <template>
    <FormWizard>
      <template #wizard-step="{tab,index,navigateToTab}">
      </template>
    </FormWizard>
  </template>
```

## active-step

Templating for steps content.

```js
  <template>
    <FormWizard>
      <template #active-step>
      </template>
    </FormWizard>
  </template>
```

## title

Templating for steps title.

```js
  <template>
    <FormWizard>
      <template #title>
      </template>
    </FormWizard>
  </template>
```

## footer

Templating for all footer section.

```js
  <template>
    <FormWizard>
      <template #footer>
      </template>
    </FormWizard>
  </template>
```

## back

Templating for only back button

```js
  <template>
    <FormWizard>
      <template #back>
      </template>
    </FormWizard>
  </template>
```

## back

Templating for only next button

```js
  <template>
    <FormWizard>
      <template #next>
      </template>
    </FormWizard>
  </template>
```

## done

Templating for only done button

```js
  <template>
    <FormWizard>
      <template #done>
      </template>
    </FormWizard>
  </template>
```
