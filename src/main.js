import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi} from 'vuetify/iconsets/mdi'
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
