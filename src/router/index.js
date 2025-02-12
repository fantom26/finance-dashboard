import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import TheCharts from '@/views/TheCharts.vue'
import TheTable from '@/views/TheTable.vue'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: routes.TABLE },
    { path: routes.TABLE, component: TheTable, meta: { transition: 'slide-left' } },
    { path: routes.CHARTS, component: TheCharts, meta: { transition: 'slide-right' } },
    { path: routes.NOT_FOUND, component: NotFound },
  ],
})

export default router
