<template>
    <main>

        <transition name="blog" mode="out-in" >
            <div v-if="isLoading" class="isloading">
                <sync-loader :loading="isLoading" :color="color" :size="size"></sync-loader>
            </div>

            <div v-else class="oneblog">
                <div class="title">
                    <h1> {{ blog.title }} </h1>
                </div>
                <img :src="`http://localhost:8000/${blog.img}`" alt="blog img">
                <div class="content">
                    <p> {{ blog.content }} </p>
                </div>
            </div>
        </transition>

    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Interfaces
import { Iblog } from '@/interfaces/blogs'

// Components
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        SyncLoader
    },
    data() {
        return {
            blog: {} as Iblog,
            isLoading: true,
            color: '#FFAF00',
            size: '15px',
        }
    },
    methods: {
        async getBlog() {
            const {data} = await axios.get(`http://localhost:8000/getoneblog/${this.paramsID}`)
            this.blog = data.data
            this.isLoading = false
        }
    },
    computed: {
        paramsID() {
            return this.$route.params.blogID
        }
    },
    created() {
        this.getBlog()
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

main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
}

h1 {
    margin: 4rem 0;
}

img {
    width: 100%;
    margin-bottom: 3rem;
}

.blog-enter-active {
    animation: fade 0.3s ease-in;
}

.blog-leave-active {
    animation: fade 0.3s ease-out reverse;
}

.oneblog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 5rem;
}

.title {
    display: flex;
    justify-content: center;
}

.content {
    display: flex;
    justify-content: flex-start;
}

</style>