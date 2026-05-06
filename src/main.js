import '@/styles/settings/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import globalComponents from '@/plugins/global-components.js'
import vMaska from '@/plugins/v-maska.js'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(globalComponents)
app.use(vMaska)

app.mount('#app')
