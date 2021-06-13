import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Views 
import Root from '@/views/root/Root.vue'
import Blogs from '@/views/blogs/Blogs.vue'
import Contact from '@/views/contact/Contact.vue'
import Login from '@/views/login/Login.vue'
import Signup from '@/views/signup/Signup.vue'
import Admin from '@/views/admin/Admin.vue'
import AllUsers from '@/views/users/AllUsers.vue'
import ViewBlog from '@/views/viewBlog/ViewBlog.vue'

// Typescripts
import { Roles } from '@/interfaces/enumsRole'

// State
import State from '../store/root/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    component: Root
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {

      if (State.state.isAuth) {
        return next('/')
      }

      return next()

    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter(to, from, next) {

      if (State.state.isAuth) {
        return next('/')
      }

      return next()

    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter(to, from, next) {

      if (!State.state.isAuth || State.state.user.role !== Roles.ADMIN) {
        return next('/')
      }

      return next()

    }
  },
  {
    path: '/allusers',
    name: 'AllUsers',
    component: AllUsers,
    beforeEnter(to, from, next) {

      if (!State.state.isAuth || State.state.user.role !== Roles.ADMIN) {
        return next('/')
      }

      return next()

    }
  },
  {
    path: '/blog/:blogID',
    name: 'OneBlog',
    component: ViewBlog
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
