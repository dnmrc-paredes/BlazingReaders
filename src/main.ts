import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/root/index'
import { Store } from 'vuex'
import { Iuser } from './interfaces/user'

// Global Components
import TheSidebar from '@/components/sidebar/TheSidebar.vue'

declare module '@vue/runtime-core' {
    // Declare your own store states.
    interface State {
      user: Iuser
      isAuth: boolean
      token: string
    }
  
    interface ComponentCustomProperties {
      $store: Store<State>
    }
  
}

createApp(App).
component('the-sidebar', TheSidebar).
use(store).
use(router).
mount('#app')
