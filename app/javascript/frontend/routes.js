import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('./views/pages/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/pages/about.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;