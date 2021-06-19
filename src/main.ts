import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/root/index'
import { Store } from 'vuex'
import { Iuser } from './interfaces/user'

// Global Components
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
import TheHeader from '@/components/header/TheHeader.vue'
import LoginPopUp from '@/components/notLoggedIn/LoginPopUp.vue'

declare module '@vue/runtime-core' {
    // Declare your own store states.
    interface State {
      user: Iuser
      rootUser: Iuser
      isAuth: boolean
      token: string
      dropdown?: {
        isDropdownOpen: boolean
      }
    }
  
    interface ComponentCustomProperties {
      $store: Store<State>
    }
  
}

createApp(App).
component('the-sidebar', TheSidebar).
component('the-header', TheHeader ).
component('login-pop-up', LoginPopUp).
use(store).
use(router).
mount('#app')
