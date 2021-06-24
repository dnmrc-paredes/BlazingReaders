<template>
    <nav>
        <ul>
            <li @click="toPersonal" > Personal Information </li>
            <li @click="toPublisher" > Publisher Settings </li>
            <li @click="toAvatar" > Change Avatar </li>
            <li @click="toPassword" > Change Password </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    methods: {
        toPersonal() {
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'profile'}})
        },
        toAvatar() {
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'avatar'}})
        },
        toPassword() {
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'password'}})
        },
        toPublisher() {
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'publisher'}})
        }
    }
})

</script>

<style scoped>

nav {
    width: 100%;
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

</style>