import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: routes.HOME },
    { path: routes.HOME, component: HomeView },
    { path: routes.CHARTS, component: () => import('@/views/TheCharts.vue') },
    { path: routes.NOT_FOUND, component: () => import('@/views/NotFound.vue') },
  ],
})

export default router
