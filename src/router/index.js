import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cartazes',
      name: 'cartazes',
      component: () => import('../views/CartazesView.vue'),
    },
     {
      path: '/loja',
      name: 'loja',
      component: () => import('../views/LojaView.vue'),
    },
     {
      path: '/final',
      name: 'final',
      component: () => import('../views/FinalView.vue'),
    },
  ],
})

export default router
