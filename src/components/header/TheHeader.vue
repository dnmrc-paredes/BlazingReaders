<template>
    <nav>
        <div class="navlogo">
            <h1 @click="toHome" > {{ isSmall ? 'BR' : 'BlazingReaders' }} </h1>
        </div>

        <div class="navlinks">
            <router-link v-if="!isSmall" to="/" > Home </router-link>
            <router-link to="/blogs" > Blogs </router-link>
            <router-link v-if="!isSmall" to="/about" > About </router-link>
            <!-- <p> <img @click="toggle" src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/> </p> -->
            <div v-if="isAuth" class="dropdown">
                <p>
                    <img id="profile" @click="toggle" v-if="myProfile" :src="`https://blazing-readers-rest-api.herokuapp.com/${myProfile}`" alt="">
                    <img v-else @click="toggle" src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/>
                    <!-- <img id="profile" @click="toggle" v-if="myProfile" :src="`http://localhost:8000/${myProfile}`" alt="">
                    <img @click="toggle" src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/>  -->
                </p>
                <div v-if="dropdownStatus" class="droplist">
                    <li @click="toHome" v-if="isSmall" > Home </li>
                    <li @click="toProfile" > Profile </li>
                    <li @click="toDashboard" v-if="userRole === 'admin'" > Dashboard </li>
                    <li @click="toPublisher" v-else> Become a Publisher </li>
                    <li @click="toSettings" > Settings </li>
                    <li @click="toAbout" v-if="isSmall" > About </li>
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
    data() {
        return {
            currentW: window.innerWidth,
            isSmall: window.innerWidth < 600
        }
    },
    methods: {
        login() {
            this.$router.push({name: 'Login', path: '/login'})
        },
        logout() {
            this.toggle()
            this.$store.dispatch('unsetAuth')
            this.$store.dispatch('unsetMyInfo')
            // this.$router.replace({name: 'Root', path: '/'})
            this.$router.replace({name: 'Login', path: '/login'})
        },
        toggle() {
            this.$store.dispatch('dropdown/toggleDropdown')
        },
        toDashboard() {
            this.toggle()
            this.$router.push({name: 'Admin', path: '/admin'})
        },
        toProfile() {
            this.toggle()
            this.$router.push({name: 'Profile', path: '/profile'})
        },
        toSettings() {
            this.toggle()
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'profile'}})
        },
        toPublisher() {
            this.toggle()
            this.$router.push({name: 'Settings', path: '/settings', query: {tab: 'publisher'}})
        },
        toHome() {
            this.toggle()
            this.$router.push({name: 'Root', path: '/'})
        },
        toAbout() {
            this.toggle()
            this.$router.push({name: 'About', path: '/about'})
        }
    },
    computed: {
        dropdownStatus() {
            return this.$store.state.dropdown?.isDropdownOpen
        },
        userRole() {
            return this.$store.state.rootUser.role
        },
        isAuth() {
            return this.$store.state.isAuth
        },
        myProfile() {
            return this.$store.state.rootUser.avatar
        }
    },
    created() {
        window.onresize = () => {
            this.currentW = window.innerWidth
            if (this.currentW < 600) {
                this.isSmall = true
            } else {
                this.isSmall = false
            }
        }
    }
})

</script>

<style scoped>

nav {
    display: flex;
    /* position: fixed;
    top: 0; */
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

.navlogo h1 {
    cursor: pointer;
}

.navlinks {
    flex: 10;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.dropdown {
    z-index: 1;
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