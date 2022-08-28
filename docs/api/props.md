# Props

## id

form-wizard-vue manin container's id.

```js
  id: {
    type: String,
    default: 'fw-' + new Date().valueOf()
  }
```

## customTabs

Component uses customTabs for steps handling. Added default value only for sample

```js
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
```

## nextButton

All your next button options can be selected with this prop

```js
  nextButton: {
    type: Object,
    default: function () {
      return {}
    }
  }
```

## backButton

All your back button options can be selected with this prop

```js
  backButton: {
    type: Object,
    default: function () {
      return {}
    }
  }
```

## doneButton

All your done button options can be selected with this prop

```js
  doneButton: {
    type: Object,
    default: function () {
      return {}
    }
  }
```

## hideButtons

This props hide your footer buttons

```js
   hideButtons: {
    type: Boolean,
    default: false
  }
```

## startIndex

Active step selectable with this props

```js
   startIndex: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0
    }
  }
```

## verticalTabs

Sets the position of wizard to vertical

```js
   verticalTabs: {
    type: Boolean,
    default: false
  }
```

## beforeChange

Works your callback funtion before step change

```js
   beforeChange: {
    type: Function,
    default: () => {}
  }
```

## beforeMount

Works your callback funtion before steps mount

```js
   beforeMount: {
    type: Function,
    default: () => {}
  }
```

## navigableTabs

When it's true your clicked tabs change step

```js
   navigableTabs: {
    type: Boolean,
    default: false
  }
```

## scrollableTabs

When it's true tabs can be scroll

```js
   scrollableTabs: {
    type: Boolean,
    default: false
  }
```

## cardBackground

Puts all the wizard on the card

```js
   cardBackground: {
    type: Boolean,
    default: false
  }
```

## squaredTabs

Makes the steps square

```js
   squaredTabs: {
    type: Boolean,
    default: false
  }
```
