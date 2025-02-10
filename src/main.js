import '@/styles/settings/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import globalComponents from '@/plugins/global-components.js'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(globalComponents)

app.mount('#app')
