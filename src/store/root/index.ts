import { Iuser } from '@/interfaces/user'
import { State } from '@vue/runtime-core'
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

// Vue X
import {mutations} from '@/store/root/mutations'
import {actions} from '@/store/root/actions'

// Modules
// import {dropdownStore} from '@/store/modules/dropdown/index'

export default createStore<State>({
    modules: {
        dropdown: {
            namespaced: true,
            state: {
                isDropdownOpen: false
            },
            mutations: {
                toggleDropdown(state) {
                    state.isDropdownOpen = !state.isDropdownOpen
                }
            },
            actions: {
                toggleDropdown(context) {
                    context.commit('toggleDropdown')
                }
            }
        }
    },
    plugins: [createPersistedState()],
    state: {
        user: {} as Iuser,
        isAuth: false,
        token: ''
    },
    mutations,
    actions
})

// export default createStore<State>({
//     plugins: [createPersistedState()],
//     state: {
//         user: {} as Iuser,
//         isAuth: false,
//         token: ''
//     },
//     mutations: {
//         setUser(state, payload) {
//             state.user = payload.data
//             state.token = payload.token
//         },
//         setAuth(state) {
//             if (state.isAuth === true) {
//                 state.isAuth = false
//                 state.token = ''
//                 return state.user = {} as Iuser
//             }

//             return state.isAuth = true
//         }
//     },
//     actions: {
//         setUser(context, payload) {
//             context.commit('setUser', payload)
//         },
//         setAuth(context) {
//             context.commit('setAuth')
//         }
//     }
// })