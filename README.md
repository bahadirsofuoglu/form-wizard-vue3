# Form Wizard Vue3

Form Wizard Vue 3 is a simple stepper/wizard component. It can be easily customized, has no dependencies, works in harmony with your components.
![Current Release](https://img.shields.io/npm/v/form-wizard-vue3) ![Bundle Size](https://img.shields.io/bundlephobia/min/form-wizard-vue3) ![Downloads](https://img.shields.io/npm/dt/form-wizard-vue3) ![Coverage Status](https://img.shields.io/codecov/c/github/bahadirsofuoglu/form-wizard-vue3) ![MIT License](https://img.shields.io/npm/l/form-wizard-vue3)

## Documentation

Complete documentation and examples will be available soon.

- **[Documentation](https://bahadirsofuoglu.github.io/form-wizard-vue3/)**
- **[Live Demo](https://stackblitz.com/edit/vue-1bngkw?file=src/App.vue)**

## Install

```bash
yarn add form-wizard-vue3

# or use npm

npm install form-wizard-vue3
```

Then, import component globally:

```js
import Wizard from 'form-wizard-vue3'

export default {
  install(app) {
    app.component('Wizard', Wizard)
  }
}
```

Or import component directly:

```js
import 'form-wizard-vue3/dist/form-wizard-vue3.css'
import Wizard from 'form-wizard-vue3'
```

The component itself does not include any CSS. You'll need to include it separately:

```js
import 'form-wizard-vue3/dist/form-wizard-vue3.css'
```

## License

[MIT](https://github.com/bahadirsofuoglu/form-wizard-vue3/blob/master/LICENSE.md)
