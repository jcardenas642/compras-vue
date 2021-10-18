import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue"
import isAutenticado from './auth'

const routes = [
  {
    path: '/',
    name: 'Registro',
    component: Home,
    beforeEnter:[isAutenticado],
  },
  {
    path: '/compras',
    name: 'Compras',
    beforeEnter: [isAutenticado],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/inicio-sesion',
    name: 'Login',
    component: Login,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
