import '@/styles/settings/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import TheContainer from '@/components/UI/TheContainer.vue'

const app = createApp(App)

app.component('the-container', TheContainer)

app.use(router)
app.use(store)

app.mount('#app')
