import { createRouter, createWebHistory } from 'vue-router'
import TheTable from '@/views/TheTable.vue'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: routes.TABLE },
    { path: routes.TABLE, component: TheTable },
    { path: routes.CHARTS, component: () => import('@/views/TheCharts.vue') },
    { path: routes.NOT_FOUND, component: () => import('@/views/NotFound.vue') },
  ],
})

export default router
