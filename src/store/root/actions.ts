import { State } from "@vue/runtime-core"
import { ActionContext, ActionTree } from "vuex"
import axios from 'axios'

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
    },
    async myInfo(context: ActionContext<State, State>) {
        const userID = context.rootState.user._id
        const {data} = await axios.get(`https://blazing-readers-rest-api.herokuapp.com/getuserinfo/${userID}`)
        context.commit('myInfo', data.data)
    },
    unsetMyInfo(context: ActionContext<State, State>) {
        context.commit('unsetMyInfo')
    }
}