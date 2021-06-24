<template>
    <nav>
        <h1 @click="toggleDropdown" > Settings </h1>
        <transition name="dropdown" >
            <ul v-if="!isSmall || isOpen" >
                <li @click="toPersonal" > Personal Information </li>
                <li @click="toPublisher" > Publisher Settings </li>
                <li @click="toAvatar" > Change Avatar </li>
                <li @click="toPassword" > Change Password </li>
            </ul>
        </transition>
    </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return{
            isOpen: false,
            currentW: window.innerWidth,
            isSmall: window.innerWidth < 1100
        }
    },
    methods: {
        toPersonal() {
            // this.toggleDropdown()
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'profile'}})
        },
        toAvatar() {
            // this.toggleDropdown()
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'avatar'}})
        },
        toPassword() {
            // this.toggleDropdown()
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'password'}})
        },
        toPublisher() {
            // this.toggleDropdown()
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'publisher'}})
        },
        toggleDropdown() {
            this.isOpen = !this.isOpen
        }
    },
    created() {
        window.onresize = () => {
            this.currentW = window.innerWidth
            if (this.currentW < 1100) {
                this.isSmall = true
            } else {
                this.isSmall = false
            }
        }
    }
})

</script>

<style scoped>

/* Animations & Transitions */

.dropdown-enter-active {
    animation: fade 0.3s ease-in;
}

.dropdown-leave-active {
    animation: fade 0.3s ease-in reverse;
}

nav {
    width: 100%;
}

h1 {
    cursor: pointer;
}

ul {
    margin-bottom: 1rem;
}

li {
    cursor: pointer;
    list-style: none;
    font-family: var(--small);
    font-weight: 400;
    margin: 0.5rem 0;
    transition-property: all;
    transition-duration: 0.3s;
    text-indent: 5px;
}

li:hover {
    border-left: solid #FFAF00 5px;
}

/* Media Q's */

@media screen and (max-width: 400px) {

    h1 {
        font-size: 10vw;
    }

}

</style>