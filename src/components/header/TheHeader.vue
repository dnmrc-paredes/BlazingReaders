<template>
    <nav>
        <div class="navlogo">
            <h1> Lorem-Blog </h1>
        </div>

        <div class="navlinks">
            <router-link to="/" > Home </router-link>
            <router-link to="/blogs" > Blogs </router-link>
            <router-link to="/about" > About </router-link>
            <!-- <p> <img @click="toggle" src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/> </p> -->
            <div v-if="isAuth" class="dropdown">
                <p> <img @click="toggle" src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/> </p>
                <div v-if="dropdownStatus" class="droplist">
                    <li @click="toProfile" > Profile </li>
                    <li @click="toDashboard" v-if="userRole === 'admin'" > Dashboard </li>
                    <li v-else> Become a Publisher </li>
                    <li @click="toSettings" > Settings </li>
                    <li @click="logout" > Logout </li>
                </div>
            </div>
            <p v-else @click="login" > Login </p>
        </div>
    </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    methods: {
        login() {
            this.$router.push({name: 'Login', path: '/login'})
        },
        logout() {
            this.toggle()
            this.$store.dispatch('unsetAuth')
            this.$router.push({name: 'Login', path: '/login'})
        },
        toggle() {
            this.$store.dispatch('dropdown/toggleDropdown')
        },
        toDashboard() {
            this.$router.push({name: 'Admin', path: '/admin'})
        },
        toProfile() {
            this.toggle()
            this.$router.push({name: 'Profile', path: '/profile'})
        },
        toSettings() {
            this.toggle()
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'profile'}})
        }
    },
    computed: {
        dropdownStatus() {
            return this.$store.state.dropdown?.isDropdownOpen
        },
        userRole() {
            return this.$store.state.user.role
        },
        isAuth() {
            return this.$store.state.isAuth
        }
    }
})

</script>

<style scoped>

nav {
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1rem 2rem;
    background-color: #FFAF00;
}

h1 {
    color: white;
}

li {
    list-style: none;
    margin: 0.2rem 0;
    cursor: pointer;
    font-family: var(--small);
    font-weight: 400;
}

a, p {
    margin: 0 0.5rem;
    text-decoration: none;
    color: white;
    cursor: pointer;
    font-family: var(--small);
    font-weight: 400;
}

a:hover {
    text-decoration: underline;
}

.router-link-active {
    text-decoration: underline;
}

.navlogo {
    flex: 5;
    display: flex;
    align-items: center;
}

.navlinks {
    flex: 10;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.dropdown {
    position: relative;
}

.droplist {
    background-color: whitesmoke;
    border-radius: 5px;
    padding: 1rem 1.5rem;
    margin: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 10px;
    width: 200px;
}

</style>