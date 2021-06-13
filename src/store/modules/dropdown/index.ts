import {createStore} from 'vuex'

export const dropdownStore = createStore({
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
})