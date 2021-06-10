import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Views 
import Login from '@/views/login/Login.vue'
import Signup from '@/views/signup/Signup.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
