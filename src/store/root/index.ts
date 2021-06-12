import { Iuser } from '@/interfaces/user'
import { State } from '@vue/runtime-core'
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore<State>({
    plugins: [createPersistedState()],
    state: {
        user: {} as Iuser,
        isAuth: false,
        token: ''
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload.data
            state.token = payload.token
        },
        setAuth(state) {
            if (state.isAuth === true) {
                state.isAuth = false
                state.token = ''
                return state.user = {} as Iuser
            }

            return state.isAuth = true
        }
    },
    actions: {
        setUser(context, payload) {
            context.commit('setUser', payload)
        },
        setAuth(context) {
            context.commit('setAuth')
        }
    }
})