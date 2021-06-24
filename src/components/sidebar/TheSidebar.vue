<template>
    <nav>
        
        <ul>
            <li> <img @click="toHome" src="https://img.icons8.com/ios-glyphs/40/FFAF00/home.png"/> </li>
            <li> <img @click="toDashboard" src="https://img.icons8.com/material-rounded/40/FFAF00/dashboard.png"/> </li>
            <li> <img @click="toManage" src="https://img.icons8.com/material-sharp/40/FFAF00/task.png"/> </li>
            <li> <img @click="openCreate" class="addblog" src="https://img.icons8.com/material-rounded/40/FFAF00/add.png"/> </li>
            <li> <img @click="logout" src="https://img.icons8.com/material/40/FFAF00/logout-rounded-down--v2.png"/> </li>
        </ul>

        <transition name="createblog" >
            <create-blog propTitle="Create A Blog" propBtn="Create Blog" @close-form="openCreate" v-if="isCreateOpen" />
        </transition>

    </nav>
</template>

<script lang="ts">


// Components
import CreateBlog from '@/components/createBlog/CreateBlog.vue'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        CreateBlog
    },
    data() {
        return {
            isCreateOpen: false as boolean
        }
    },
    methods: {
        toHome() {
            this.$router.push({name: 'Root', path: '/'})
        },
        toDashboard() {
            this.$router.push({name: 'Admin', path: '/admin'})
        },
        toManage() {
            this.$router.push({name: 'Manage', path: '/manageblogs'})
        },
        openCreate() {
            this.isCreateOpen = !this.isCreateOpen
        },
        logout() {
            this.$store.dispatch('unsetAuth')
            this.$store.dispatch('unsetMyInfo')
            this.$router.push({name: 'Login', path: '/login'})
        }
    }
})

</script>

<style scoped>

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.createblog-enter-active {
    animation: fade 0.3s ease-in;
}

.createblog-leave-active {
    animation: fade 0.3s ease-in reverse;
}

nav {
    padding-top: 4rem;
    height: 100%;
    width: 4rem;
    position: relative;
    /* #00008b */
    /* border-right: #2c3e50 solid 0.1px; */
    /* background-color: #010101; */
    /* background-color: whitesmoke; */
    /* color: #2c3e50; */
}

ul {
    display: flex;
    flex-direction: column;
}

li {
    margin: 0.2rem auto;
    list-style: none;
}

img {
    width: 100%;
    cursor: pointer;
    transition-duration: 0.3s;
    transition-property: all;
}

img:hover {
    transform: scale(1.1);
}

/* Media Q's */

@media screen and (max-width: 550px) {

    nav {
        padding: 0.5rem;
        height: 4rem;
        width: 100%;
    }

    ul {
        flex-direction: row;
    }

}

</style>