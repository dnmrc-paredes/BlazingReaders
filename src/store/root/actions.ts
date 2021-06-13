import { State } from "@vue/runtime-core"
import { ActionContext, ActionTree } from "vuex"

/* eslint-disable */ 
export const actions: ActionTree<State, State> = {
    setUser(context: ActionContext<State ,State>, payload: any) {
        context.commit('setUser', payload)
    },
    setAuth(context: ActionContext<State,State>) {
        context.commit('setAuth')
    },
    unsetAuth(context: ActionContext<State, State>) {
        context.commit('unsetAuth')
        context.commit('unsetUser')
    }
}