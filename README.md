# Form Wizard Vue3

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

### use directly

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
