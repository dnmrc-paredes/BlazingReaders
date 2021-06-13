import { Iuser } from "@/interfaces/user"
import { State } from "@vue/runtime-core"
import { MutationTree } from "vuex"

/* eslint-disable */ 
export const mutations: MutationTree<State> = {
    setUser(state, payload: any) {
        state.user = payload.data
        state.token = payload.token
    },
    setAuth(state) {
        state.isAuth = true
    },
    unsetUser(state) {
        state.user = {} as Iuser
        state.token = ""
    },
    unsetAuth(state) {
        state.isAuth = false
    }
}